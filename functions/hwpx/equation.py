"""Equation helper for building hp:equation XML elements.

Generates HWPX equation XML using Hangul equation script syntax.
"""

_equation_counter: int = 0


def reset_equation_counter() -> None:
    """Reset the auto-incrementing equation ID counter."""
    global _equation_counter
    _equation_counter = 0


def _next_equation_id() -> int:
    """Get the next auto-incrementing equation ID."""
    global _equation_counter
    current = _equation_counter
    _equation_counter += 1
    return current


def build_equation_xml(script: str, width: int = 14000) -> str:
    """Build an hp:equation XML element for inline/block equations.

    Args:
        script: Equation in Hangul equation script syntax.
        width: Width of the equation object in HWPUNIT. Default 14000.

    Returns:
        XML string for the equation element to embed in hp:run.
    """
    eq_id = _next_equation_id()
    height = 3000
    baseline_offset = 850

    return f"""<hp:equation id="{eq_id}" zOrder="0" numberingType="EQUATION"
        textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0"
        dropcapstyle="None" version="" baseLine="86" textColor="#000000"
        baseUnit="1000" lineMode="CHAR" font="HYhwpEQ">
        <hp:sz width="{width}" widthRelTo="ABSOLUTE"
               height="{height}" heightRelTo="ABSOLUTE" protect="0"/>
        <hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1"
                allowOverlap="0" holdAnchorAndSO="0"
                vertRelTo="PAPER" horzRelTo="COLUMN"
                vertAlign="BOTTOM" horzAlign="LEFT"
                vertOffset="{baseline_offset}" horzOffset="0"/>
        <hp:outMargin left="56" right="56" top="56" bottom="56"/>
        <hp:script>{_escape_xml(script)}</hp:script>
      </hp:equation>"""


def build_equation_paragraph(
    script: str,
    para_pr_id: int = 0,
    char_pr_id: int = 1,
    width: int = 14000,
) -> str:
    """Build a complete hp:p paragraph containing an equation.

    Args:
        script: Equation in Hangul equation script syntax.
        para_pr_id: Paragraph property ID reference.
        char_pr_id: Character property ID reference.
        width: Width of the equation in HWPUNIT.

    Returns:
        Complete hp:p XML string with an embedded equation.
    """
    eq_xml = build_equation_xml(script, width)
    return f"""  <hp:p id="0" paraPrIDRef="{para_pr_id}" styleIDRef="0"
         pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="{char_pr_id}">
      {eq_xml}
      <hp:t/>
    </hp:run>
  </hp:p>"""


def _escape_xml(text: str) -> str:
    """Escape special XML characters in equation script."""
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )
