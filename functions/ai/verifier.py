"""Multi-AI cross verification using Gemini and Claude.

The verifier solves each problem independently with both AIs,
then compares answers. If answers diverge, the problem is fixed
and re-verified up to max_rounds.
"""

from __future__ import annotations

import json
import os
from collections import Counter
from typing import TypedDict

import anthropic
import google.generativeai as genai

from ai.prompts import FIX_PROMPT, VERIFICATION_PROMPT


class VerificationResult(TypedDict):
    """Result of the verification process."""

    status: str  # "verified", "verified_majority", "failed"
    confidence: str  # "high", "medium", "low"
    problem_text: str
    equations: list[str]
    solution_steps: list[str]
    answer: str
    rounds_used: int


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


def _gemini_solve(problem_text: str, equations: list[str]) -> SolveResult:
    """Solve a problem independently using a NEW Gemini session."""
    api_key = os.environ.get("GEMINI_API_KEY", "")
    genai.configure(api_key=api_key)

    # New model instance = new session, no context from generation
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


def _claude_solve(problem_text: str, equations: list[str]) -> SolveResult:
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
    # Strip markdown fences if present
    if raw_text.startswith("```"):
        lines = raw_text.split("\n")
        raw_text = "\n".join(lines[1:-1])

    parsed: SolveResult = json.loads(raw_text)
    return parsed


def _most_common_answer(answers: list[str]) -> str:
    """Find the most common answer from a list."""
    counter = Counter(answers)
    return counter.most_common(1)[0][0]


def _fix_problem(
    original_problem: str,
    variant_text: str,
    variant_equations: list[str],
    generator_answer: str,
    gemini_result: SolveResult,
    claude_result: SolveResult,
) -> dict[str, str | list[str]]:
    """Fix a problem whose answers diverged across verifiers."""
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

    return json.loads(response.text.strip())


def verify_problem(
    original_problem: str,
    variant: dict[str, str | list[str]],
    max_rounds: int = 3,
) -> VerificationResult:
    """Run multi-AI cross verification on a generated problem.

    Args:
        original_problem: The original problem text (for context in fixes).
        variant: Dict with problem_text, equations, solution_steps, answer.
        max_rounds: Maximum verification/fix rounds.

    Returns:
        VerificationResult with status, confidence, and final problem data.
    """
    current = variant

    for round_num in range(max_rounds):
        problem_text = str(current["problem_text"])
        equations = list(current.get("equations", []))
        generator_answer = str(current["answer"])

        # Independent verification by both AIs
        gemini_result = _gemini_solve(problem_text, equations)
        claude_result = _claude_solve(problem_text, equations)

        answers = [
            generator_answer.strip(),
            gemini_result["answer"].strip(),
            claude_result["answer"].strip(),
        ]

        unique_answers = set(answers)

        # 3-way match: all agree
        if len(unique_answers) == 1:
            return VerificationResult(
                status="verified",
                confidence="high",
                problem_text=problem_text,
                equations=equations,
                solution_steps=list(current.get("solution_steps", [])),
                answer=generator_answer,
                rounds_used=round_num + 1,
            )

        # 2-way match: majority wins
        majority = _most_common_answer(answers)
        if answers.count(majority) >= 2:
            # Use the majority answer's solution steps
            if majority == gemini_result["answer"].strip():
                steps = gemini_result["solution_steps"]
            elif majority == claude_result["answer"].strip():
                steps = claude_result["solution_steps"]
            else:
                steps = list(current.get("solution_steps", []))

            return VerificationResult(
                status="verified_majority",
                confidence="medium",
                problem_text=problem_text,
                equations=equations,
                solution_steps=steps,
                answer=majority,
                rounds_used=round_num + 1,
            )

        # All different: fix the problem and retry
        fixed = _fix_problem(
            original_problem,
            problem_text,
            equations,
            generator_answer,
            gemini_result,
            claude_result,
        )
        current = fixed

    return VerificationResult(
        status="failed",
        confidence="low",
        problem_text=str(current.get("problem_text", "")),
        equations=list(current.get("equations", [])),
        solution_steps=list(current.get("solution_steps", [])),
        answer=str(current.get("answer", "")),
        rounds_used=max_rounds,
    )
