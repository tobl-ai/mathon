"""Gemini Vision OCR for extracting math problems from images."""

from __future__ import annotations

import json
import os
from typing import TypedDict

import google.generativeai as genai

from ai.prompts import OCR_PROMPT


class ExtractedProblem(TypedDict):
    """Structure for a problem extracted via OCR."""

    problem_number: int
    problem_text: str
    equations: list[str]
    answer: str


def _configure_gemini() -> None:
    """Configure the Gemini API with the environment key."""
    api_key = os.environ.get("GEMINI_API_KEY", "")
    genai.configure(api_key=api_key)


def extract_problems_from_image(
    image_data: bytes,
    mime_type: str = "image/png",
) -> list[ExtractedProblem]:
    """Extract math problems from an image using Gemini Vision.

    Args:
        image_data: Raw bytes of the image file.
        mime_type: MIME type of the image (image/png, image/jpeg, etc.).

    Returns:
        List of extracted problems with text, equations, and answers.
    """
    _configure_gemini()
    model = genai.GenerativeModel("gemini-2.5-flash")

    image_part = {
        "mime_type": mime_type,
        "data": image_data,
    }

    response = model.generate_content(
        [OCR_PROMPT, image_part],
        generation_config=genai.GenerationConfig(
            temperature=0.1,
            response_mime_type="application/json",
        ),
    )

    raw_text = response.text.strip()
    parsed: list[ExtractedProblem] = json.loads(raw_text)
    return parsed


def extract_problems_from_pdf(
    pdf_data: bytes,
) -> list[ExtractedProblem]:
    """Extract math problems from a PDF using Gemini Vision.

    Args:
        pdf_data: Raw bytes of the PDF file.

    Returns:
        List of extracted problems with text, equations, and answers.
    """
    _configure_gemini()
    model = genai.GenerativeModel("gemini-2.5-flash")

    pdf_part = {
        "mime_type": "application/pdf",
        "data": pdf_data,
    }

    response = model.generate_content(
        [OCR_PROMPT, pdf_part],
        generation_config=genai.GenerationConfig(
            temperature=0.1,
            response_mime_type="application/json",
        ),
    )

    raw_text = response.text.strip()
    parsed: list[ExtractedProblem] = json.loads(raw_text)
    return parsed
