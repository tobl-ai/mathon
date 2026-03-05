"""HWPX file generation using ZIP + XML strings.

Creates valid HWPX files from scratch following the HWPX programming guide.
Key rules:
- mimetype: "application/hwp+zip", STORED, first file in ZIP
- linesegarray: completely omitted (verified working)
- outlineShapeIDRef="0" (prevents landscape rendering bug)
- NO hp:ctrl/hp:colPr (prevents layout interference)
"""

from __future__ import annotations

import os
import tempfile
import zipfile
from typing import TypedDict

from hwpx.equation import (
    build_equation_paragraph,
    reset_equation_counter,
)
from hwpx.templates import (
    CONTAINER_XML,
    CONTENT_HPF,
    MANIFEST_XML,
    MIMETYPE,
    SETTINGS_XML,
    VERSION_XML,
    build_header_xml,
)


class Problem(TypedDict):
    """Structure for a single math problem."""

    number: int
    text: str
    equations: list[str]
    solution_steps: list[str]
    answer: str


SEC_PR = """      <hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134"
                tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT"
                outlineShapeIDRef="0" memoShapeIDRef="0"
                textVerticalWidthHead="0" masterPageCnt="0">
        <hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/>
        <hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/>
        <hp:visibility hideFirstHeader="0" hideFirstFooter="0"
                       hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL"
                       hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/>
        <hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/>
        <hp:pagePr landscape="NARROWLY" width="59528" height="84188" gutterType="LEFT_ONLY">
          <hp:margin header="4251" footer="4251" gutter="0"
                     left="4251" right="4251" top="4251" bottom="4251"/>
        </hp:pagePr>
        <hp:footNotePr>
          <hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/>
          <hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/>
          <hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/>
          <hp:numbering type="CONTINUOUS" newNum="1"/>
          <hp:placement place="EACH_COLUMN" beneathText="0"/>
        </hp:footNotePr>
        <hp:endNotePr>
          <hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/>
          <hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/>
          <hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/>
          <hp:numbering type="CONTINUOUS" newNum="1"/>
          <hp:placement place="END_OF_DOCUMENT" beneathText="0"/>
        </hp:endNotePr>
        <hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER"
                           headerInside="0" footerInside="0" fillArea="PAPER">
          <hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
        </hp:pageBorderFill>
        <hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER"
                           headerInside="0" footerInside="0" fillArea="PAPER">
          <hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
        </hp:pageBorderFill>
        <hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER"
                           headerInside="0" footerInside="0" fillArea="PAPER">
          <hp:offset left="1417" right="1417" top="1417" bottom="1417"/>
        </hp:pageBorderFill>
      </hp:secPr>"""

SEC_HEADER = """<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hs:sec xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app"
        xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph"
        xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section"
        xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core"
        xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">"""


def _text_paragraph(
    text: str, para_pr: int = 0, char_pr: int = 1
) -> str:
    """Build a simple text paragraph."""
    escaped = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )
    return f"""  <hp:p id="0" paraPrIDRef="{para_pr}" styleIDRef="0"
         pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="{char_pr}">
      <hp:t>{escaped}</hp:t>
    </hp:run>
  </hp:p>"""


def _build_section_xml(
    title: str, problems: list[Problem], include_solutions: bool
) -> str:
    """Build the complete section0.xml content."""
    paragraphs: list[str] = []

    # First paragraph: secPr only (no text)
    paragraphs.append(
        f"""  <hp:p id="0" paraPrIDRef="0" styleIDRef="0"
         pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="0">
{SEC_PR}
    </hp:run>
  </hp:p>"""
    )

    # Title
    paragraphs.append(_text_paragraph(title, para_pr=1, char_pr=2))

    # Empty line
    paragraphs.append(_text_paragraph(""))

    # Problems
    for prob in problems:
        header = f"{prob['number']}. {prob['text']}"
        paragraphs.append(_text_paragraph(header, char_pr=1))

        for eq_script in prob.get("equations", []):
            paragraphs.append(build_equation_paragraph(eq_script))

        if include_solutions:
            paragraphs.append(_text_paragraph(""))
            paragraphs.append(
                _text_paragraph("[풀이]", char_pr=2)
            )
            for step in prob.get("solution_steps", []):
                paragraphs.append(_text_paragraph(step, char_pr=1))
            paragraphs.append(
                _text_paragraph(f"정답: {prob['answer']}", char_pr=2)
            )

        paragraphs.append(_text_paragraph(""))

    body = "\n".join(paragraphs)
    return f"{SEC_HEADER}\n{body}\n</hs:sec>"


def generate_hwpx(
    title: str,
    problems: list[Problem],
    include_solutions: bool = True,
) -> str:
    """Generate an HWPX file and return its temporary file path.

    Args:
        title: Document title shown at the top.
        problems: List of Problem dicts with text, equations, solutions.
        include_solutions: Whether to include solution steps and answers.

    Returns:
        Path to the generated .hwpx file in a temp directory.
    """
    reset_equation_counter()

    header_xml = build_header_xml()
    section_xml = _build_section_xml(title, problems, include_solutions)

    tmp_fd, tmp_path = tempfile.mkstemp(suffix=".hwpx")
    os.close(tmp_fd)

    with zipfile.ZipFile(tmp_path, "w") as zf:
        # mimetype MUST be first, STORED (no compression)
        zf.writestr(
            zipfile.ZipInfo("mimetype"),
            MIMETYPE,
            compress_type=zipfile.ZIP_STORED,
        )
        zf.writestr("version.xml", VERSION_XML)
        zf.writestr("settings.xml", SETTINGS_XML)
        zf.writestr("META-INF/container.xml", CONTAINER_XML)
        zf.writestr("META-INF/manifest.xml", MANIFEST_XML)
        zf.writestr("Contents/content.hpf", CONTENT_HPF)
        zf.writestr("Contents/header.xml", header_xml)
        zf.writestr("Contents/section0.xml", section_xml)

    return tmp_path
