"""한 문제로 HWPX 생성 테스트.

실행: cd functions && python test_single_problem.py
결과: /tmp/mathon_test.hwpx (한컴오피스에서 열어서 확인)
"""

import shutil
from hwpx.generator import generate_hwpx

# 테스트 문제: 삼차함수 (실제 수능 스타일)
test_problem = {
    "number": 1,
    "text": "최고차항의 계수가 1인 삼차함수 f(x)가 다음 조건을 만족시킬 때, f(4)의 값을 구하시오.",
    "equations": [
        "f(x) = x^3 + ax^2 + bx + c",
        "f(-x) = -f(x)",
        "| f(x) | = {1} over {4}",
    ],
    "solution_steps": [
        "f(-x) = -f(x) 이므로 f(x)는 기함수이다.",
        "기함수 조건에서 a = 0, c = 0",
        "따라서 f(x) = x^3 + bx",
        "|f(x)| = 1/4 이 서로 다른 네 실근을 가지려면",
        "f(x) = x^3 - (3/4)x 이어야 한다.",
        "f(4) = 64 - 3 = 61",
    ],
    "answer": "61",
}

output_path = "/tmp/mathon_test.hwpx"
tmp = generate_hwpx(
    title="매스온 테스트 - 유사 문제",
    problems=[test_problem],
    include_solutions=True,
)
shutil.move(tmp, output_path)
print(f"생성 완료: {output_path}")
print("한컴오피스에서 열어서 수식이 편집 가능한지 확인하세요.")
