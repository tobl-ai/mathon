"""Individual AI solver implementations for Gemini and Claude."""

from __future__ import annotations

import json
import os
from typing import TypedDict

import anthropic
import google.generativeai as genai

from ai.prompts import FIX_PROMPT, VERIFICATION_PROMPT


class SolveResult(TypedDict):
    """Result from a single AI solver."""

    solution_steps: list[str]
    answer: str
    confidence: str
    issues: list[str]


def _build_equations_section(equations: list[str]) -> str:
    """Format equations for the verification prompt."""
    if not equations:
        return ""
    lines = "\n".join(f"  {eq}" for eq in equations)
    return f"Equations:\n{lines}"


def gemini_solve(problem_text: str, equations: list[str]) -> SolveResult:
    """Solve a problem independently using a NEW Gemini session."""
    api_key = os.environ.get("GEMINI_API_KEY", "")
    genai.configure(api_key=api_key)

    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = VERIFICATION_PROMPT.format(
        problem_text=problem_text,
        equations_section=_build_equations_section(equations),
    )

    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            temperature=0.1,
            response_mime_type="application/json",
        ),
    )

    parsed: SolveResult = json.loads(response.text.strip())
    return parsed


def claude_solve(problem_text: str, equations: list[str]) -> SolveResult:
    """Solve a problem independently using Claude."""
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    client = anthropic.Anthropic(api_key=api_key)

    prompt = VERIFICATION_PROMPT.format(
        problem_text=problem_text,
        equations_section=_build_equations_section(equations),
    )

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )

    raw_text = message.content[0].text.strip()
    if raw_text.startswith("```"):
        lines = raw_text.split("\n")
        raw_text = "\n".join(lines[1:-1])

    parsed: SolveResult = json.loads(raw_text)
    return parsed


def fix_problem_via_ai(
    original_problem: str,
    variant_text: str,
    variant_equations: list[str],
    generator_answer: str,
    gemini_result: SolveResult,
    claude_result: SolveResult,
) -> dict[str, str | list[str]]:
    """Fix a problem whose answers diverged across verifiers.

    Includes BOTH AIs' reasoning so the generator understands
    why answers diverged.
    """
    api_key = os.environ.get("GEMINI_API_KEY", "")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = FIX_PROMPT.format(
        original_problem=original_problem,
        variant_problem=variant_text,
        equations=json.dumps(variant_equations, ensure_ascii=False),
        generator_answer=generator_answer,
        gemini_answer=gemini_result["answer"],
        gemini_steps=json.dumps(
            gemini_result["solution_steps"], ensure_ascii=False
        ),
        claude_answer=claude_result["answer"],
        claude_steps=json.dumps(
            claude_result["solution_steps"], ensure_ascii=False
        ),
    )

    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            temperature=0.3,
            response_mime_type="application/json",
        ),
    )

    result: dict[str, str | list[str]] = json.loads(response.text.strip())
    return result
