"""한 문제로 HWPX 생성 테스트 (미주 + 수식 풀이).

실행: cd functions && python test_single_problem.py
결과: ~/Downloads/mathon_test.hwpx (한컴오피스에서 열어서 확인)
"""

import shutil
from hwpx.generator import generate_hwpx

# 고2 수학 문제: 삼차함수 그래프 + 미적분 (수능 스타일)
test_problem = {
    "number": 1,
    "text": (
        "삼차함수 f(x) = x^3 - 3x^2 + k 의 그래프가 x축과 "
        "서로 다른 세 점에서 만나도록 하는 상수 k의 값의 범위를 구하시오."
    ),
    "equations": [
        "f(x) = x^3 - 3x^2 + k",
        "f '(x) = 3x^2 - 6x = 3x(x - 2)",
    ],
    "solution_steps": [
        {"text": "f'(x) = 0에서 극값을 구한다."},
        {"equation": "f '(x) = 3x^2 - 6x = 3x(x-2) = 0"},
        {"text": "x = 0 (극대), x = 2 (극소)"},
        {"text": "극댓값:"},
        {"equation": "f(0) = 0 - 0 + k = k"},
        {"text": "극솟값:"},
        {"equation": "f(2) = 8 - 12 + k = k - 4"},
        {
            "text": (
                "그래프가 x축과 서로 다른 세 점에서 만나려면 "
                "극댓값 > 0 이고 극솟값 < 0 이어야 한다."
            ),
        },
        {"equation": "k > 0 ~~~`and`~~~ k - 4 < 0"},
        {"text": "따라서"},
        {"equation": "0 < k < 4"},
    ],
    "answer": "0 < k < 4",
}

output_path = shutil.os.path.expanduser("~/Downloads/mathon_test_endnote.hwpx")
tmp = generate_hwpx(
    title="매스온 테스트 - 고2 삼차함수 그래프",
    problems=[test_problem],
    include_solutions=True,
)
shutil.move(tmp, output_path)
print(f"생성 완료: {output_path}")
print("한컴오피스에서 열어서 미주(endnote)와 수식이 정상인지 확인하세요.")
