"""Gemini-based math problem variant generator."""

from __future__ import annotations

import json
import os
from typing import TypedDict

import google.generativeai as genai

from ai.prompts import GENERATION_PROMPT


class GeneratedProblem(TypedDict):
    """Structure for a generated variant problem."""

    problem_text: str
    equations: list[str]
    solution_steps: list[str]
    answer: str


def _configure_gemini() -> None:
    """Configure the Gemini API with the environment key."""
    api_key = os.environ.get("GEMINI_API_KEY", "")
    genai.configure(api_key=api_key)


def generate_variant_problems(
    original_problem: str,
    variation_type: str = "number_change",
    difficulty: int = 2,
    count: int = 3,
) -> list[GeneratedProblem]:
    """Generate variant math problems from an original.

    Args:
        original_problem: The original problem text.
        variation_type: "number_change" or "structure_change".
        difficulty: 1 (easy), 2 (medium), or 3 (hard).
        count: Number of variants to generate.

    Returns:
        List of generated problem variants.
    """
    _configure_gemini()
    model = genai.GenerativeModel("gemini-2.5-flash")

    results: list[GeneratedProblem] = []

    for _ in range(count):
        prompt = GENERATION_PROMPT.format(
            original_problem=original_problem,
            variation_type=variation_type,
            difficulty=difficulty,
        )

        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.8,
                response_mime_type="application/json",
            ),
        )

        raw_text = response.text.strip()
        parsed: GeneratedProblem = json.loads(raw_text)
        results.append(parsed)

    return results
