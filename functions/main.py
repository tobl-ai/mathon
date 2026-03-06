"""Cloud Function entry points for the Mathon project.

Firebase Functions 2.0 (Python) - HTTP functions for math problem
generation pipeline: OCR -> Generate -> Verify -> HWPX -> Download URL.
"""

from __future__ import annotations

import base64
import json
import os
import tempfile
from typing import TypedDict

from firebase_functions import https_fn, options

from ai.generator import generate_variant_problems
from ai.ocr import extract_problems_from_image, extract_problems_from_pdf
from ai.verifier import verify_problem
from hwpx.generator import Problem, generate_hwpx
from utils.storage import upload_to_storage


class GenerateRequest(TypedDict, total=False):
    """Expected request body for generate_problems."""

    image_base64: str
    mime_type: str
    variation_type: str
    difficulty: int
    count: int
    include_solutions: bool
    title: str


@https_fn.on_request(
    cors=options.CorsOptions(cors_origins="*", cors_methods=["POST"]),
    memory=options.MemoryOption.GB_1,
    timeout_sec=540,
    region="asia-northeast3",
)
def generate_problems(req: https_fn.Request) -> https_fn.Response:
    """HTTP function: image/PDF -> OCR -> generate -> verify -> HWPX.

    Request body (JSON):
        image_base64: Base64-encoded image or PDF data.
        mime_type: MIME type (image/png, image/jpeg, application/pdf).
        variation_type: "number_change" or "structure_change".
        difficulty: 1 (easy), 2 (medium), 3 (hard).
        count: Number of variants per original problem.
        include_solutions: Whether to include solutions in the HWPX.
        title: Document title.

    Returns:
        JSON with download_url and problem details.
    """
    if req.method != "POST":
        return https_fn.Response(
            json.dumps({"error": "POST method required"}),
            status=405,
            headers={"Content-Type": "application/json"},
        )

    body: GenerateRequest = req.get_json(silent=True) or {}

    image_b64 = body.get("image_base64", "")
    if not image_b64:
        return https_fn.Response(
            json.dumps({"error": "image_base64 is required"}),
            status=400,
            headers={"Content-Type": "application/json"},
        )

    mime_type = body.get("mime_type", "image/png")
    variation_type = body.get("variation_type", "number_change")
    difficulty = body.get("difficulty", 2)
    count = body.get("count", 3)
    include_solutions = body.get("include_solutions", True)
    title = body.get("title", "수학 변형 문제")

    image_data = base64.b64decode(image_b64)

    # Step 1: OCR - Extract problems from image/PDF
    if mime_type == "application/pdf":
        extracted = extract_problems_from_pdf(image_data)
    else:
        extracted = extract_problems_from_image(image_data, mime_type)

    if not extracted:
        return https_fn.Response(
            json.dumps({"error": "No problems found in the image"}),
            status=422,
            headers={"Content-Type": "application/json"},
        )

    # Step 2 & 3: Generate variants and verify each
    all_problems: list[Problem] = []
    problem_number = 1

    for original in extracted:
        original_text = original["problem_text"]
        variants = generate_variant_problems(
            original_text, variation_type, difficulty, count
        )

        for variant in variants:
            result = verify_problem(original_text, variant)

            if result["status"] in ("verified", "verified_majority"):
                all_problems.append(
                    Problem(
                        number=problem_number,
                        text=result["problem_text"],
                        equations=result["equations"],
                        solution_steps=result["solution_steps"],
                        answer=result["answer"],
                    )
                )
                problem_number += 1

    if not all_problems:
        return https_fn.Response(
            json.dumps({
                "error": "No problems passed verification",
            }),
            status=422,
            headers={"Content-Type": "application/json"},
        )

    # Step 4: Generate HWPX
    hwpx_path = generate_hwpx(title, all_problems, include_solutions)

    # Step 5: Upload to Storage
    import uuid

    file_id = uuid.uuid4().hex[:12]
    remote_path = f"generated/{file_id}.hwpx"
    download_url = upload_to_storage(hwpx_path, remote_path)

    # Cleanup temp file
    os.unlink(hwpx_path)

    response_data = {
        "download_url": download_url,
        "problem_count": len(all_problems),
        "problems": [
            {
                "number": p["number"],
                "text": p["text"],
                "answer": p["answer"],
            }
            for p in all_problems
        ],
    }

    return https_fn.Response(
        json.dumps(response_data, ensure_ascii=False),
        status=200,
        headers={"Content-Type": "application/json"},
    )
