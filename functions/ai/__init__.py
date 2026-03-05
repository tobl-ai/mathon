"""AI module for OCR, problem generation, and verification."""

from ai.ocr import extract_problems_from_image
from ai.generator import generate_variant_problems
from ai.verifier import verify_problem

__all__ = [
    "extract_problems_from_image",
    "generate_variant_problems",
    "verify_problem",
]
