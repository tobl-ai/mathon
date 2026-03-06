"""그래프/도형 이미지가 포함된 고2 수학 문제 HWPX 생성 테스트.

실행: cd functions && python test_with_images.py
결과: ~/Downloads/mathon_test_images.hwpx
"""

import shutil
from hwpx.generator import generate_hwpx
from hwpx.figures import generate_cubic_graph, generate_triangle_circumscribed

# 1 inch = 7200 HWPUNIT, 이미지 4inch x 3.5inch
IMG_W = 28800
IMG_H = 25200

# --- 문제 1: 삼차함수 그래프 ---
graph_png = generate_cubic_graph()

problem_graph = {
    "number": 1,
    "text": (
        "삼차함수 f(x) = x^3 - 3x^2 + k 의 그래프가 x축과 "
        "서로 다른 세 점에서 만나도록 하는 상수 k의 값의 범위를 구하시오. "
        "[그래프 참조]"
    ),
    "equations": [
        "f(x) = x^3 - 3x^2 + k",
        "f '(x) = 3x^2 - 6x = 3x(x - 2)",
    ],
    "images": [
        {
            "data": graph_png,
            "filename": "graph1.png",
            "width": IMG_W,
            "height": IMG_H,
        },
    ],
    "solution_steps": [
        {"text": "f'(x) = 0에서 극값을 구한다."},
        {"equation": "f '(x) = 3x^2 - 6x = 3x(x-2) = 0"},
        {"text": "x = 0 (극대), x = 2 (극소)"},
        {"text": "극댓값:"},
        {"equation": "f(0) = k"},
        {"text": "극솟값:"},
        {"equation": "f(2) = 8 - 12 + k = k - 4"},
        {
            "text": (
                "그래프가 x축과 서로 다른 세 점에서 만나려면 "
                "극댓값 > 0 이고 극솟값 < 0"
            ),
        },
        {"equation": "0 < k < 4"},
    ],
    "answer": "0 < k < 4",
}

# --- 문제 2: 외접원 도형 ---
triangle_png = generate_triangle_circumscribed()

problem_geometry = {
    "number": 2,
    "text": (
        "그림과 같이 삼각형 ABC에서 AB = 4, BC = 6, CA = 5이다. "
        "삼각형 ABC의 외접원의 반지름 R의 값을 구하시오."
    ),
    "equations": [],
    "images": [
        {
            "data": triangle_png,
            "filename": "triangle1.png",
            "width": IMG_W,
            "height": IMG_H,
        },
    ],
    "solution_steps": [
        {"text": "코사인 법칙으로 cos A를 구한다."},
        {"equation": "cos A = {b^2 + c^2 - a^2} over {2bc} = {25 + 16 - 36} over {2 cdot 5 cdot 4} = {5} over {40} = {1} over {8}"},
        {"text": "sin A를 구한다."},
        {"equation": "sin A = sqrt{1 - cos^2 A} = sqrt{1 - {1} over {64}} = sqrt{{63} over {64}} = {3 sqrt{7}} over {8}"},
        {"text": "사인 법칙으로 외접원 반지름 R을 구한다."},
        {"equation": "{a} over {sin A} = 2R"},
        {"equation": "2R = {6} over {{3 sqrt{7}} over {8}} = {6 cdot 8} over {3 sqrt{7}} = {16} over {sqrt{7}} = {16 sqrt{7}} over {7}"},
        {"equation": "R = {8 sqrt{7}} over {7}"},
    ],
    "answer": "8√7 / 7",
}

output_path = shutil.os.path.expanduser("~/Downloads/mathon_test_images.hwpx")
tmp = generate_hwpx(
    title="매스온 테스트 - 고2 그래프 + 도형",
    problems=[problem_graph, problem_geometry],
    include_solutions=True,
)
shutil.move(tmp, output_path)
print(f"생성 완료: {output_path}")
print("한컴오피스에서 열어서 그래프, 도형, 미주, 수식을 확인하세요.")
