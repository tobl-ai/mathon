"""XML templates for HWPX file generation.

All boilerplate XML strings for the HWPX package structure.
Based on the HWPX programming guide section 8.4.
"""

MIMETYPE = "application/hwp+zip"

VERSION_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hv:HCFVersion xmlns:hv="http://www.hancom.co.kr/hwpml/2011/version"
  tagetApplication="WORDPROCESSOR" major="5" minor="1" micro="1"
  buildNumber="0" os="10" xmlVersion="1.5"
  application="Hancom Office Hangul" appVersion="12.0.0.0"/>"""

SETTINGS_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<ha:HWPApplicationSetting
  xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app"
  xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0">
  <ha:CaretPosition listIDRef="0" paraIDRef="0" pos="0"/>
</ha:HWPApplicationSetting>"""

CONTAINER_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<ocf:container xmlns:ocf="urn:oasis:names:tc:opendocument:xmlns:container">
  <ocf:rootfiles>
    <ocf:rootfile full-path="Contents/content.hpf"
                  media-type="application/hwpml-package+xml"/>
  </ocf:rootfiles>
</ocf:container>"""

MANIFEST_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<odf:manifest xmlns:odf="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"/>"""

CONTENT_HPF = """<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<opf:package version="" unique-identifier="" id=""
  xmlns:opf="http://www.idpf.org/2007/opf/">
  <opf:metadata>
    <opf:language>ko</opf:language>
  </opf:metadata>
  <opf:manifest>
    <opf:item id="header" href="Contents/header.xml" media-type="application/xml"/>
    <opf:item id="section0" href="Contents/section0.xml" media-type="application/xml"/>
    <opf:item id="settings" href="settings.xml" media-type="application/xml"/>
  </opf:manifest>
  <opf:spine>
    <opf:itemref idref="header" linear="yes"/>
    <opf:itemref idref="section0" linear="yes"/>
  </opf:spine>
</opf:package>"""


def _font_group(lang: str) -> str:
    """Generate a single fontface group XML."""
    return f"""      <hh:fontface lang="{lang}" fontCnt="2">
        <hh:font id="0" face="\ub9d1\uc740 \uace0\ub515" type="TTF" isEmbedded="0"/>
        <hh:font id="1" face="\ud568\ucd08\ub868\ubc14\ud0d5" type="TTF" isEmbedded="0"/>
      </hh:fontface>"""


def _char_pr(pr_id: int, height: int, font_ref: int, bold: bool) -> str:
    """Generate a charPr XML element."""
    fr = str(font_ref)
    bold_tag = "\n        <hh:bold/>" if bold else ""
    return f"""      <hh:charPr id="{pr_id}" height="{height}" textColor="#000000" shadeColor="none"
                 useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1">
        <hh:fontRef hangul="{fr}" latin="{fr}" hanja="{fr}" japanese="{fr}" other="{fr}" symbol="{fr}" user="{fr}"/>
        <hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
        <hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
        <hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
        <hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>{bold_tag}
        <hh:underline type="NONE" shape="SOLID" color="#000000"/>
        <hh:strikeout shape="NONE" color="#000000"/>
        <hh:outline type="NONE"/>
        <hh:shadow type="NONE" color="#C0C0C0" offsetX="10" offsetY="10"/>
      </hh:charPr>"""


def _para_pr(pr_id: int, align: str) -> str:
    """Generate a paraPr XML element with hp:switch."""
    return f"""      <hh:paraPr id="{pr_id}" tabPrIDRef="0" condense="0" fontLineHeight="0"
                 snapToGrid="1" suppressLineNumbers="0" checked="0">
        <hh:align horizontal="{align}" vertical="BASELINE"/>
        <hh:heading type="NONE" idRef="0" level="0"/>
        <hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD"
                         widowOrphan="0" keepWithNext="0" keepLines="0"
                         pageBreakBefore="0" lineWrap="BREAK"/>
        <hh:autoSpacing eAsianEng="0" eAsianNum="0"/>
        <hp:switch>
          <hp:case hp:required-namespace="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar">
            <hh:margin>
              <hc:intent value="0" unit="HWPUNIT"/>
              <hc:left value="0" unit="HWPUNIT"/>
              <hc:right value="0" unit="HWPUNIT"/>
              <hc:prev value="0" unit="HWPUNIT"/>
              <hc:next value="0" unit="HWPUNIT"/>
            </hh:margin>
            <hh:lineSpacing type="PERCENT" value="160" unit="HWPUNIT"/>
          </hp:case>
          <hp:default>
            <hh:margin>
              <hc:intent value="0" unit="HWPUNIT"/>
              <hc:left value="0" unit="HWPUNIT"/>
              <hc:right value="0" unit="HWPUNIT"/>
              <hc:prev value="0" unit="HWPUNIT"/>
              <hc:next value="0" unit="HWPUNIT"/>
            </hh:margin>
            <hh:lineSpacing type="PERCENT" value="160" unit="HWPUNIT"/>
          </hp:default>
        </hp:switch>
        <hh:border borderFillIDRef="1" offsetLeft="0" offsetRight="0"
                   offsetTop="0" offsetBottom="0" connect="0" ignoreMargin="0"/>
      </hh:paraPr>"""


LANGS = ["HANGUL", "LATIN", "HANJA", "JAPANESE", "OTHER", "SYMBOL", "USER"]


def _bin_data_list(images: list[dict] | None) -> str:
    """Generate binDataList XML for embedded images."""
    if not images:
        return ""
    items = []
    for idx, img in enumerate(images, start=1):
        bin_filename = img.get("_bin_filename", img["filename"])
        fmt = bin_filename.rsplit(".", 1)[-1] if "." in bin_filename else "png"
        items.append(
            f'      <hh:binItem id="{idx}" Type="Embedding"'
            f' BinData="{bin_filename}" Format="{fmt}"/>'
        )
    items_xml = "\n".join(items)
    return f"""    <hh:binDataList itemCnt="{len(images)}">
{items_xml}
    </hh:binDataList>"""


def build_header_xml(images: list[dict] | None = None) -> str:
    """Build the complete header.xml with fonts, charPr, paraPr, styles."""
    font_groups = "\n".join(_font_group(lang) for lang in LANGS)
    char_prs = "\n".join([
        _char_pr(0, 1000, 0, False),
        _char_pr(1, 1000, 1, False),
        _char_pr(2, 1100, 0, True),
    ])
    para_prs = "\n".join([
        _para_pr(0, "JUSTIFY"),
        _para_pr(1, "CENTER"),
    ])

    bin_data_xml = _bin_data_list(images)
    bin_data_section = f"\n{bin_data_xml}" if bin_data_xml else ""

    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hh:head xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head"
         xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core"
         xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph"
         xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar"
         version="1.5" secCnt="1">
  <hh:beginNum page="1" footnote="1" endnote="1" pic="1" tbl="1" equation="1"/>
  <hh:refList>
    <hh:fontfaces itemCnt="7">
{font_groups}
    </hh:fontfaces>
    <hh:borderFills itemCnt="1">
      <hh:borderFill id="1" threeD="0" shadow="0" centerLine="NONE" breakCellSeparateLine="0">
        <hh:slash type="NONE" Crooked="0" isCounter="0"/>
        <hh:backSlash type="NONE" Crooked="0" isCounter="0"/>
        <hh:leftBorder type="NONE" width="0.1 mm" color="#000000"/>
        <hh:rightBorder type="NONE" width="0.1 mm" color="#000000"/>
        <hh:topBorder type="NONE" width="0.1 mm" color="#000000"/>
        <hh:bottomBorder type="NONE" width="0.1 mm" color="#000000"/>
        <hh:diagonal type="SOLID" width="0.1 mm" color="#000000"/>
      </hh:borderFill>
    </hh:borderFills>
    <hh:charProperties itemCnt="3">
{char_prs}
    </hh:charProperties>
    <hh:tabProperties itemCnt="1">
      <hh:tabPr id="0" autoTabLeft="0" autoTabRight="0"/>
    </hh:tabProperties>
    <hh:numberings itemCnt="1">
      <hh:numbering id="1" start="0">
        <hh:paraHead start="1" level="1" align="LEFT" useInstWidth="1" autoIndent="1"
                     widthAdjust="0" textOffsetType="PERCENT" textOffset="50"
                     numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">^1.</hh:paraHead>
      </hh:numbering>
    </hh:numberings>
    <hh:bullets itemCnt="1">
      <hh:bullet id="1" char="" useImage="0">
        <hh:paraHead level="0" align="LEFT" useInstWidth="0" autoIndent="1"
                     widthAdjust="0" textOffsetType="PERCENT" textOffset="50"
                     numFormat="DIGIT" charPrIDRef="4294967295" checkable="0"/>
      </hh:bullet>
    </hh:bullets>
    <hh:paraProperties itemCnt="2">
{para_prs}
    </hh:paraProperties>
    <hh:styles itemCnt="1">
      <hh:style id="0" type="PARA" name="\ubc14\ud0d5\uae00" engName="Normal"
                paraPrIDRef="0" charPrIDRef="0" nextStyleIDRef="0"
                langID="1042" lockForm="0"/>
    </hh:styles>{bin_data_section}
  </hh:refList>
</hh:head>"""
