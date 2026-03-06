"""Math figure generation using matplotlib.

Generates graph and geometry images for embedding in HWPX.
"""

from __future__ import annotations

import io
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Arc, FancyArrowPatch

# macOS: AppleGothic, Linux: NanumGothic fallback
plt.rcParams["font.family"] = ["AppleGothic", "Nanum Gothic", "sans-serif"]
plt.rcParams["axes.unicode_minus"] = False


def generate_cubic_graph() -> bytes:
    """Generate a cubic function graph: f(x) = x^3 - 3x^2 + k.

    Shows the curve with k=2 (three x-intercepts case),
    marks critical points, and labels axes.
    """
    fig, ax = plt.subplots(1, 1, figsize=(4, 3.5), dpi=150)

    x = np.linspace(-1.5, 3.5, 300)
    k = 2
    y = x**3 - 3 * x**2 + k

    ax.plot(x, y, "b-", linewidth=2, label=r"$f(x) = x^3 - 3x^2 + k$")
    ax.axhline(0, color="k", linewidth=0.8)
    ax.axvline(0, color="k", linewidth=0.8)

    # Critical points
    ax.plot(0, k, "ro", markersize=8, zorder=5)
    ax.annotate(
        f"극대 (0, {k})", (0, k), textcoords="offset points",
        xytext=(10, 10), fontsize=9,
        fontfamily="AppleGothic",
    )
    ax.plot(2, k - 4, "ro", markersize=8, zorder=5)
    ax.annotate(
        f"극소 (2, {k - 4})", (2, k - 4), textcoords="offset points",
        xytext=(10, -15), fontsize=9,
        fontfamily="AppleGothic",
    )

    # Dashed lines for critical values
    ax.axhline(k, color="gray", linewidth=0.5, linestyle="--")
    ax.axhline(k - 4, color="gray", linewidth=0.5, linestyle="--")

    ax.set_xlabel("x", fontsize=11)
    ax.set_ylabel("y", fontsize=11)
    ax.set_title(
        r"$f(x) = x^3 - 3x^2 + k$ $(k=2)$",
        fontsize=12,
    )
    ax.legend(fontsize=9, loc="lower right")
    ax.set_xlim(-1.5, 3.5)
    ax.set_ylim(-4, 4)
    ax.grid(True, alpha=0.3)
    fig.tight_layout()

    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)
    return buf.read()


def generate_triangle_circumscribed() -> bytes:
    """Generate a geometry figure: triangle with circumscribed circle.

    Triangle ABC with circumscribed circle, angle markings,
    and side labels for a typical geometry problem.
    """
    fig, ax = plt.subplots(1, 1, figsize=(4, 3.5), dpi=150)

    # Triangle vertices
    A = np.array([0, 3])
    B = np.array([-2.5, -1.5])
    C = np.array([3, -1.5])

    # Circumcenter calculation
    ax_val, ay = A
    bx, by = B
    cx, cy = C
    D = 2 * (ax_val * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    ux = ((ax_val**2 + ay**2) * (by - cy) + (bx**2 + by**2) * (cy - ay) + (cx**2 + cy**2) * (ay - by)) / D
    uy = ((ax_val**2 + ay**2) * (cx - bx) + (bx**2 + by**2) * (ax_val - cx) + (cx**2 + cy**2) * (bx - ax_val)) / D
    center = np.array([ux, uy])
    radius = np.linalg.norm(A - center)

    # Draw circumscribed circle
    circle = plt.Circle(center, radius, fill=False, color="blue",
                        linewidth=1.5, linestyle="-")
    ax.add_patch(circle)

    # Draw triangle
    triangle = plt.Polygon([A, B, C], fill=False, edgecolor="black",
                           linewidth=2)
    ax.add_patch(triangle)

    # Label vertices
    offset = 0.3
    ax.text(A[0], A[1] + offset, "A", fontsize=14, fontweight="bold",
            ha="center", va="bottom")
    ax.text(B[0] - offset, B[1] - offset, "B", fontsize=14,
            fontweight="bold", ha="center", va="top")
    ax.text(C[0] + offset, C[1] - offset, "C", fontsize=14,
            fontweight="bold", ha="center", va="top")

    # Label sides with lengths
    mid_bc = (B + C) / 2
    ax.text(mid_bc[0], mid_bc[1] - 0.5, "a = 6", fontsize=10,
            ha="center", color="red")
    mid_ac = (A + C) / 2
    ax.text(mid_ac[0] + 0.5, mid_ac[1], "b = 5", fontsize=10,
            ha="left", color="red")
    mid_ab = (A + B) / 2
    ax.text(mid_ab[0] - 0.5, mid_ab[1], "c = 4", fontsize=10,
            ha="right", color="red")

    # Mark circumcenter
    ax.plot(*center, "b+", markersize=10, markeredgewidth=2)
    ax.text(center[0] + 0.3, center[1] + 0.3, "O", fontsize=11,
            color="blue", fontweight="bold")

    # Draw radius line
    ax.plot([center[0], A[0]], [center[1], A[1]], "b--",
            linewidth=1, alpha=0.6)
    mid_r = (center + A) / 2
    ax.text(mid_r[0] + 0.2, mid_r[1], "R", fontsize=10,
            color="blue", fontstyle="italic")

    # Angle arc at vertex A
    angle_b = np.degrees(np.arctan2(B[1] - A[1], B[0] - A[0]))
    angle_c = np.degrees(np.arctan2(C[1] - A[1], C[0] - A[0]))
    arc = Arc(A, 1.0, 1.0, angle=0, theta1=angle_c, theta2=angle_b,
              color="green", linewidth=1.5)
    ax.add_patch(arc)
    ax.text(A[0] + 0.1, A[1] - 0.7, r"$\theta$", fontsize=12,
            color="green")

    ax.set_xlim(-4, 4.5)
    ax.set_ylim(-3.5, 4.5)
    ax.set_aspect("equal")
    ax.grid(True, alpha=0.2)
    ax.set_title(
        "삼각형 ABC의 외접원",
        fontsize=12,
        fontfamily="AppleGothic",
    )
    fig.tight_layout()

    buf = io.BytesIO()
    fig.savefig(buf, format="png", bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)
    return buf.read()
