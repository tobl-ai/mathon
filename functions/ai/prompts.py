"""All AI prompts for OCR, generation, verification, and fixing.

All prompts instruct AI to use Hangul equation syntax, not LaTeX.
"""

OCR_PROMPT = """You are a math problem extraction expert.
Analyze this image and extract all math problems.

For each problem, provide:
1. problem_number: The problem number
2. problem_text: The full problem text in Korean
3. equations: List of equations in Hangul equation syntax (NOT LaTeX)
4. answer: The expected answer if visible

Hangul equation syntax rules:
- Fractions: {numerator} over {denominator}
- Square root: sqrt {value}
- Superscript: {base} ^{exponent}
- Subscript: {base} _{index}
- Parentheses: left ( ... right )
- Summation: sum from {start} to {end}
- Integral: int from {start} to {end}
- Greek: alpha, beta, gamma, theta, pi, etc.

Return JSON array:
[
  {
    "problem_number": 1,
    "problem_text": "...",
    "equations": ["equation1", "equation2"],
    "answer": "..."
  }
]

Return ONLY valid JSON, no markdown fences."""

GENERATION_PROMPT = """You are a Korean math problem generator.
Given an original problem, create a variant problem.

Original problem:
{original_problem}

Variation type: {variation_type}
- If "number_change": Change only the numbers while keeping the same structure.
- If "structure_change": Modify the problem structure while testing the same concept.

Difficulty: {difficulty} (1=easy, 2=medium, 3=hard)

CRITICAL RULES:
1. All equations MUST use Hangul equation syntax (NOT LaTeX):
   - Fractions: {{numerator}} over {{denominator}}
   - Square root: sqrt {{value}}
   - Powers: {{base}} ^{{exponent}}
   - Subscript: {{base}} _{{index}}
2. The problem MUST have a unique, well-defined answer.
3. Solution steps must be clear and mathematically rigorous.
4. Problem text must be in Korean.

Return JSON:
{{
  "problem_text": "...",
  "equations": ["eq1", "eq2"],
  "solution_steps": ["step1", "step2", ...],
  "answer": "..."
}}

Return ONLY valid JSON, no markdown fences."""

VERIFICATION_PROMPT = """You are an independent math problem verifier.
Solve this problem from scratch. Do NOT assume any answer is correct.

Problem:
{problem_text}

{equations_section}

Show your complete work step by step, then provide the final answer.

CRITICAL:
1. Solve independently - ignore any suggested answers.
2. Show ALL calculation steps.
3. If the problem is ambiguous or has multiple valid answers, explain why.
4. Use Hangul equation syntax for any equations in your solution.

Return JSON:
{{
  "solution_steps": ["step1", "step2", ...],
  "answer": "...",
  "confidence": "high" or "medium" or "low",
  "issues": ["list any issues with the problem statement"]
}}

Return ONLY valid JSON, no markdown fences."""

FIX_PROMPT = """You are a math problem fixer.
The following problem produced inconsistent answers from multiple AI verifiers.
Fix the problem so it has a unique, well-defined answer.

Original problem that was used to generate this variant:
{original_problem}

Current variant problem:
{variant_problem}

Equations: {equations}

Generator's answer: {generator_answer}
Gemini's independent solution: {gemini_answer}
Gemini's reasoning: {gemini_steps}
Claude's independent solution: {claude_answer}
Claude's reasoning: {claude_steps}

Analyze WHY the answers diverged and fix the problem conditions so the answer
is unique and unambiguous. The fix should:
1. Keep the same mathematical concept
2. Make conditions explicit enough for a unique answer
3. Use Hangul equation syntax for all equations

Return JSON:
{{
  "problem_text": "...",
  "equations": ["eq1", "eq2"],
  "solution_steps": ["step1", "step2", ...],
  "answer": "...",
  "fix_explanation": "What was ambiguous and how it was fixed"
}}

Return ONLY valid JSON, no markdown fences."""
