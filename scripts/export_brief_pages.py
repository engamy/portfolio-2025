"""Export selected pages of the Trend Shop brief PDF as PNG for the case-study page."""
import pymupdf
from pathlib import Path

PDF = r"C:\Users\amyen\Downloads\trendshopfiles-claude\0 INFO\Trending Shop Proposal-BRIEF.pdf"
OUT = Path(r"public/pictures/portfolio-content_spring2026/02_DESIGN/01_MARSHALLS/02_ECOMM/trending_shop_casestudy")
OUT.mkdir(parents=True, exist_ok=True)

# Pages are 0-indexed in pymupdf; we want pages 2 and 3 (1-indexed).
pages = [(1, "brief-competitive-matrix.png"), (2, "brief-goals-summary.png")]

with pymupdf.open(PDF) as doc:
    for page_index, name in pages:
        page = doc[page_index]
        # 2x for retina-friendly export
        pix = page.get_pixmap(matrix=pymupdf.Matrix(2.0, 2.0), alpha=False)
        out_path = OUT / name
        pix.save(out_path)
        print(f"Wrote {out_path} ({pix.width}x{pix.height})")
