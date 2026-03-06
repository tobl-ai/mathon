"""Image embedding support for HWPX files.

Generates hp:pic XML and tracks binary items for the ZIP package.
"""

from __future__ import annotations

_image_counter: int = 0


def reset_image_counter() -> None:
    global _image_counter
    _image_counter = 0


def _next_image_id() -> int:
    global _image_counter
    current = _image_counter
    _image_counter += 1
    return current


def build_picture_paragraph(
    bin_item_id: str,
    width: int,
    height: int,
    para_pr_id: int = 0,
    char_pr_id: int = 1,
) -> str:
    """Build a paragraph containing an embedded picture.

    Args:
        bin_item_id: The binaryItemIDRef matching content.hpf manifest.
        width: Image width in HWPUNIT (1 inch = 7200).
        height: Image height in HWPUNIT.
    """
    pic_id = _next_image_id()

    pic_xml = f"""<hp:pic id="{pic_id}" zOrder="0" numberingType="PICTURE"
          textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0"
          dropcapstyle="None" reverse="0">
        <hp:sz width="{width}" widthRelTo="ABSOLUTE"
               height="{height}" heightRelTo="ABSOLUTE" protect="0"/>
        <hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1"
                allowOverlap="0" holdAnchorAndSO="0"
                vertRelTo="PAPER" horzRelTo="COLUMN"
                vertAlign="BOTTOM" horzAlign="LEFT"
                vertOffset="0" horzOffset="0"/>
        <hp:outMargin left="0" right="0" top="0" bottom="0"/>
        <hp:imgRect x0="0" y0="0" x1="0" y1="0" x2="0" y2="0" x3="0" y3="0"/>
        <hp:imgClip left="0" top="0" right="0" bottom="0"/>
        <hp:inMargin left="0" right="0" top="0" bottom="0"/>
        <hc:img binaryItemIDRef="{bin_item_id}" bright="0" contrast="0"
                effect="REAL_PIC" alpha="0"/>
      </hp:pic>"""

    return f"""  <hp:p id="0" paraPrIDRef="{para_pr_id}" styleIDRef="0"
         pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="{char_pr_id}">
      {pic_xml}
      <hp:t/>
    </hp:run>
  </hp:p>"""
