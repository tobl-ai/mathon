"""Multi-AI cross verification using Gemini and Claude.

The verifier solves each problem independently with both AIs,
then compares answers. If answers diverge, the problem is fixed
and re-verified up to max_rounds.
"""

from __future__ import annotations

import json
from collections import Counter
from typing import TypedDict

from ai.solvers import claude_solve, gemini_solve, fix_problem_via_ai


class VerificationResult(TypedDict):
    """Result of the verification process."""

    status: str
    confidence: str
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


def _most_common_answer(answers: list[str]) -> str:
    """Find the most common answer from a list."""
    counter = Counter(answers)
    return counter.most_common(1)[0][0]


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

        gemini_result = gemini_solve(problem_text, equations)
        claude_result = claude_solve(problem_text, equations)

        answers = [
            generator_answer.strip(),
            gemini_result["answer"].strip(),
            claude_result["answer"].strip(),
        ]

        unique_answers = set(answers)

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

        majority = _most_common_answer(answers)
        if answers.count(majority) >= 2:
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

        fixed = fix_problem_via_ai(
            original_problem, problem_text, equations,
            generator_answer, gemini_result, claude_result,
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
