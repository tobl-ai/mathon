"""HWPX file generation using ZIP + XML strings.

Creates valid HWPX files from scratch following the HWPX programming guide.
Key rules:
- mimetype: "application/hwp+zip", STORED, first file in ZIP
- linesegarray: completely omitted (verified working)
- outlineShapeIDRef="0" (prevents landscape rendering bug)
- NO hp:ctrl/hp:colPr (prevents layout interference)
- Solutions as endnotes (미주) linked from problem text
- Images embedded via BinData/ folder + hp:pic XML
"""

from __future__ import annotations

import os
import random
import tempfile
import zipfile
from typing import TypedDict

from hwpx.equation import (
    build_equation_paragraph,
    build_equation_xml,
    reset_equation_counter,
)
from hwpx.image import build_picture_paragraph, reset_image_counter
from hwpx.templates import (
    CONTAINER_XML,
    MANIFEST_XML,
    MIMETYPE,
    SETTINGS_XML,
    VERSION_XML,
    build_header_xml,
)


class ImageItem(TypedDict):
    """An image to embed in the document."""

    data: bytes
    filename: str  # e.g. "image1.png"
    width: int     # HWPUNIT (7200 = 1 inch)
    height: int    # HWPUNIT


class SolutionStep(TypedDict, total=False):
    """A single solution step: text with optional equation."""

    text: str
    equation: str


class Problem(TypedDict, total=False):
    """Structure for a single math problem."""

    number: int
    text: str
    equations: list[str]
    images: list[ImageItem]
    solution_steps: list[str | SolutionStep]
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
          <hp:noteLine length="-4" type="SOLID" width="0.12 mm" color="#000000"/>
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


def _escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def _text_paragraph(
    text: str, para_pr: int = 0, char_pr: int = 1,
) -> str:
    return f"""  <hp:p id="0" paraPrIDRef="{para_pr}" styleIDRef="0"
         pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="{char_pr}">
      <hp:t>{_escape(text)}</hp:t>
    </hp:run>
  </hp:p>"""


def _rand_inst_id() -> int:
    return random.randint(2_000_000_000, 2_147_483_647)


def _build_endnote_sublist(note_num: int, prob: Problem) -> str:
    paras: list[str] = []

    paras.append(f"""            <hp:p id="0" paraPrIDRef="0" styleIDRef="0"
                 pageBreak="0" columnBreak="0" merged="0">
              <hp:run charPrIDRef="0">
                <hp:ctrl>
                  <hp:autoNum num="{note_num}" numType="ENDNOTE">
                    <hp:autoNumFormat type="DIGIT" userChar=""
                         prefixChar="" suffixChar=")" supscript="0"/>
                  </hp:autoNum>
                </hp:ctrl>
                <hp:t> </hp:t>
              </hp:run>
              <hp:run charPrIDRef="2">
                <hp:t>[풀이]</hp:t>
              </hp:run>
            </hp:p>""")

    for step in prob.get("solution_steps", []):
        if isinstance(step, dict):
            if step.get("text"):
                paras.append(
                    f"""            <hp:p id="2147483648" paraPrIDRef="0" styleIDRef="0"
                 pageBreak="0" columnBreak="0" merged="0">
              <hp:run charPrIDRef="1">
                <hp:t>{_escape(step["text"])}</hp:t>
              </hp:run>
            </hp:p>"""
                )
            if step.get("equation"):
                eq_xml = build_equation_xml(step["equation"])
                paras.append(
                    f"""            <hp:p id="2147483648" paraPrIDRef="0" styleIDRef="0"
                 pageBreak="0" columnBreak="0" merged="0">
              <hp:run charPrIDRef="1">
                {eq_xml}
                <hp:t/>
              </hp:run>
            </hp:p>"""
                )
        else:
            paras.append(
                f"""            <hp:p id="2147483648" paraPrIDRef="0" styleIDRef="0"
                 pageBreak="0" columnBreak="0" merged="0">
              <hp:run charPrIDRef="1">
                <hp:t>{_escape(step)}</hp:t>
              </hp:run>
            </hp:p>"""
            )

    paras.append(
        f"""            <hp:p id="2147483648" paraPrIDRef="0" styleIDRef="0"
                 pageBreak="0" columnBreak="0" merged="0">
              <hp:run charPrIDRef="2">
                <hp:t>{_escape("정답: " + prob.get("answer", ""))}</hp:t>
              </hp:run>
            </hp:p>"""
    )
    return "\n".join(paras)


def _build_problem_paragraph(prob: Problem, note_num: int) -> str:
    inst_id = _rand_inst_id()
    sublist_content = _build_endnote_sublist(note_num, prob)
    problem_text = f"{prob['number']}. {prob['text']}"

    return f"""  <hp:p id="0" paraPrIDRef="0" styleIDRef="0"
         pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="1">
      <hp:ctrl>
        <hp:endNote number="{note_num}" suffixChar="41" instId="{inst_id}">
          <hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK"
                      vertAlign="TOP" linkListIDRef="0" linkListNextIDRef="0"
                      textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">
{sublist_content}
          </hp:subList>
        </hp:endNote>
      </hp:ctrl>
      <hp:t>{_escape(problem_text)}</hp:t>
    </hp:run>
  </hp:p>"""


def _collect_images(problems: list[Problem]) -> list[ImageItem]:
    """Collect all images from all problems and assign BIN IDs."""
    images: list[ImageItem] = []
    for prob in problems:
        images.extend(prob.get("images", []))
    # Assign BIN#### ids for HWPX compatibility
    for idx, img in enumerate(images, start=1):
        fmt = img["filename"].rsplit(".", 1)[-1] if "." in img["filename"] else "png"
        img["_bin_id"] = f"BIN{idx:04d}"
        img["_bin_filename"] = f"BIN{idx:04d}.{fmt}"
    return images


def _build_content_hpf(images: list[ImageItem]) -> str:
    """Build content.hpf with optional BinData image entries."""
    items = [
        '    <opf:item id="header" href="Contents/header.xml" media-type="application/xml"/>',
        '    <opf:item id="section0" href="Contents/section0.xml" media-type="application/xml"/>',
        '    <opf:item id="settings" href="settings.xml" media-type="application/xml"/>',
    ]
    for img in images:
        bin_id = img["_bin_id"]
        bin_filename = img["_bin_filename"]
        items.append(
            f'    <opf:item id="{bin_id}" href="BinData/{bin_filename}" media-type="image/png"/>'
        )

    items_xml = "\n".join(items)
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<opf:package version="" unique-identifier="" id=""
  xmlns:opf="http://www.idpf.org/2007/opf/">
  <opf:metadata>
    <opf:language>ko</opf:language>
  </opf:metadata>
  <opf:manifest>
{items_xml}
  </opf:manifest>
  <opf:spine>
    <opf:itemref idref="header" linear="yes"/>
    <opf:itemref idref="section0" linear="yes"/>
  </opf:spine>
</opf:package>"""


def _build_section_xml(
    title: str, problems: list[Problem], include_solutions: bool,
) -> str:
    paragraphs: list[str] = []

    paragraphs.append(
        f"""  <hp:p id="0" paraPrIDRef="0" styleIDRef="0"
         pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="0">
{SEC_PR}
    </hp:run>
  </hp:p>"""
    )

    paragraphs.append(_text_paragraph(title, para_pr=1, char_pr=2))
    paragraphs.append(_text_paragraph(""))

    for idx, prob in enumerate(problems):
        if include_solutions:
            paragraphs.append(
                _build_problem_paragraph(prob, note_num=idx + 1)
            )
        else:
            header = f"{prob['number']}. {prob['text']}"
            paragraphs.append(_text_paragraph(header, char_pr=1))

        # Equations
        for eq_script in prob.get("equations", []):
            paragraphs.append(build_equation_paragraph(eq_script))

        # Images
        for img in prob.get("images", []):
            paragraphs.append(
                build_picture_paragraph(
                    img["_bin_id"], img["width"], img["height"],
                )
            )

        paragraphs.append(_text_paragraph(""))

    body = "\n".join(paragraphs)
    return f"{SEC_HEADER}\n{body}\n</hs:sec>"


def generate_hwpx(
    title: str,
    problems: list[Problem],
    include_solutions: bool = True,
) -> str:
    """Generate an HWPX file and return its temporary file path."""
    reset_equation_counter()
    reset_image_counter()

    all_images = _collect_images(problems)
    header_xml = build_header_xml(images=all_images)
    content_hpf = _build_content_hpf(all_images)
    section_xml = _build_section_xml(title, problems, include_solutions)

    tmp_fd, tmp_path = tempfile.mkstemp(suffix=".hwpx")
    os.close(tmp_fd)

    with zipfile.ZipFile(tmp_path, "w") as zf:
        zf.writestr(
            zipfile.ZipInfo("mimetype"),
            MIMETYPE,
            compress_type=zipfile.ZIP_STORED,
        )
        zf.writestr("version.xml", VERSION_XML)
        zf.writestr("settings.xml", SETTINGS_XML)
        zf.writestr("META-INF/container.xml", CONTAINER_XML)
        zf.writestr("META-INF/manifest.xml", MANIFEST_XML)
        zf.writestr("Contents/content.hpf", content_hpf)
        zf.writestr("Contents/header.xml", header_xml)
        zf.writestr("Contents/section0.xml", section_xml)

        for img in all_images:
            zf.writestr(f"BinData/{img['_bin_filename']}", img["data"])

    return tmp_path
