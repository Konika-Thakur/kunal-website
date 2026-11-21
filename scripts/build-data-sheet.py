"""Builds data/kunal-website-data.xlsx from data/site-data.json + the files in public/.

Run:  node scripts/export-data.mjs  &&  python scripts/build-data-sheet.py
"""
import json
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
d = json.loads((ROOT / "data" / "site-data.json").read_text(encoding="utf-8"))
M = d["M"]

wb = Workbook()
wb.remove(wb.active)
HEAD_FONT = Font(bold=True, color="FFFFFF")
HEAD_FILL = PatternFill("solid", fgColor="1F2937")


def file_info(src):
    """(exists, size_mb) for a site path like /media/x.jpg."""
    if not src or src.startswith("http"):
        return "external", None
    p = PUBLIC / src.lstrip("/")
    return ("yes", round(p.stat().st_size / 1_048_576, 2)) if p.exists() else ("MISSING", None)


def sheet(name, headers, rows):
    ws = wb.create_sheet(name)
    ws.append(headers)
    for c in ws[1]:
        c.font, c.fill = HEAD_FONT, HEAD_FILL
    for r in rows:
        ws.append(["; ".join(map(str, v)) if isinstance(v, list) else v for v in r])
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = ws.dimensions
    for i, h in enumerate(headers, 1):
        width = max([len(str(h))] + [len(str(r[i - 1] or "")) for r in rows]) + 2
        ws.column_dimensions[get_column_letter(i)].width = min(width, 70)
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.alignment = Alignment(vertical="top", wrap_text=True)
    return ws


# --- Studio / contact -------------------------------------------------------
sheet("Studio", ["Field", "Value"], [[k, v] for k, v in d["studio"].items()])

# --- Founder ----------------------------------------------------------------
f = d["founder"]
sheet(
    "Founder",
    ["Field", "Value"],
    [["name", f["name"]], ["role", f["role"]]]
    + [[f"bio {i + 1}", b] for i, b in enumerate(f["bio"])]
    + [["skills", f["skills"]], ["gear", f["gear"]], ["education", f["education"]]],
)
sheet(
    "Experience",
    ["Role", "Organisation", "When", "Where", "Highlights"],
    [[e["role"], e["org"], e["when"], e["where"], "\n".join(e["points"])] for e in f["experience"]],
)

# --- Stats / brands / nav ---------------------------------------------------
sheet("Stats", ["Number", "Suffix", "Label"], [[s["n"], s["s"], s["label"]] for s in d["stats"]])
sheet("Brands", ["#", "Brand"], [[i + 1, b] for i, b in enumerate(d["brands"])])
sheet("Navigation", ["Label", "URL"], [[n["label"], n["href"]] for n in d["nav"]])

# --- Categories -------------------------------------------------------------
sheet(
    "Categories",
    ["Slug", "Page", "Title", "Kicker", "Blurb", "Cover image"],
    [[c["slug"], c["href"], c["title"], c["kicker"], c["blurb"], c["cover"]["src"]] for c in d["categories"]],
)

# --- Films ------------------------------------------------------------------
film_rows = []
for section, films in [
    ("Wedding", d["weddingFilms"]),
    ("Property", d["propertyFilms"]),
    ("Brand", d["brandFilms"]),
    ("Music video", [d["musicVideo"]]),
]:
    for fl in films:
        video = fl.get("src") or f"https://www.youtube.com/watch?v={fl['id']}"
        exists, size = file_info(fl.get("src"))
        film_rows.append([
            section, fl["title"], fl["sub"], fl["kind"], "vertical" if fl.get("vertical") else "landscape",
            video, exists, size, fl["cover"]["src"], fl["id"],
        ])
sheet(
    "Films",
    ["Section", "Title", "Subtitle", "Hosting", "Orientation", "Video", "File present", "Size (MB)", "Poster", "ID"],
    film_rows,
)

# --- Property projects ------------------------------------------------------
sheet(
    "Property Projects",
    ["Key", "Name", "Type", "Description", "Image count", "Images"],
    [[p["key"], p["name"], p["type"], p["note"], len(p["images"]), "\n".join(i["src"] for i in p["images"])]
     for p in d["propertyProjects"]],
)

# --- Media library (everything referenced in media.json) --------------------
media_rows = []


def add(category, group, label, img):
    exists, size = file_info(img["src"])
    media_rows.append([category, group, label, img["src"], img.get("w"), img.get("h"),
                       img.get("poster", ""), exists, size])


for i, im in enumerate(M["wedding"]):
    add("wedding", "", i + 1, im)
for grp, ims in M["property"].items():
    for i, im in enumerate(ims):
        add("property", grp, i + 1, im)
for i, im in enumerate(M["corporate"]):
    add("corporate", "", i + 1, im)
for k in ("portrait", "close", "full"):
    add("kunal", k, k, M["kunal"][k])
for i, im in enumerate(M["kunal"]["gallery"]):
    add("kunal", "gallery", i + 1, im)
for pid, im in M["posters"].items():
    add("posters", pid, im.get("title", ""), im)
for k, im in M["video"].items():
    add("video", k, k, im)
sheet(
    "Media Library",
    ["Category", "Group", "Item", "Path", "Width", "Height", "Poster", "File present", "Size (MB)"],
    media_rows,
)

# --- Every asset file shipped with the site ---------------------------------
KIND = {".jpg": "image", ".jpeg": "image", ".png": "image", ".webp": "image", ".svg": "logo/vector",
        ".mp4": "video", ".webm": "video", ".mov": "video"}
assets = []
for p in sorted(PUBLIC.rglob("*")):
    if p.is_file():
        rel = p.relative_to(PUBLIC).as_posix()
        assets.append([KIND.get(p.suffix.lower(), p.suffix.lstrip(".")), rel.split("/")[1] if rel.count("/") > 1 else "",
                       "/" + rel, "public/" + rel, round(p.stat().st_size / 1_048_576, 2)])
icon = ROOT / "src/app/icon.svg"
assets.insert(0, ["logo/vector", "site logo (favicon)", "/icon.svg", "src/app/icon.svg",
                  round(icon.stat().st_size / 1_048_576, 4)])
sheet("All Assets", ["Type", "Folder", "Site URL", "Repo path", "Size (MB)"], assets)

# --- Summary first ----------------------------------------------------------
summary = wb.create_sheet("Summary", 0)
summary.append(["Kunal Nagia / Odyra Studio — website data"])
summary["A1"].font = Font(bold=True, size=14)
summary.append(["Source: src/data/site.ts + src/data/media.json. Regenerate with "
                "`node scripts/export-data.mjs && python scripts/build-data-sheet.py`."])
summary.append([])
summary.append(["Sheet", "Rows"])
for c in summary[4]:
    c.font, c.fill = HEAD_FONT, HEAD_FILL
for ws in wb.worksheets[1:]:
    summary.append([ws.title, ws.max_row - 1])
by_type = {}
for a in assets:
    by_type.setdefault(a[0], [0, 0.0])
    by_type[a[0]][0] += 1
    by_type[a[0]][1] += a[4]
summary.append([])
summary.append(["Asset type", "Files", "Total MB"])
for c in summary[summary.max_row]:
    c.font, c.fill = HEAD_FONT, HEAD_FILL
for t, (n, mb) in sorted(by_type.items()):
    summary.append([t, n, round(mb, 1)])
summary.column_dimensions["A"].width = 24
summary.column_dimensions["B"].width = 10
summary.column_dimensions["C"].width = 10

missing = [r for r in media_rows + film_rows if "MISSING" in r]
out = ROOT / "data" / "kunal-website-data.xlsx"
wb.save(out)
print(f"wrote {out.relative_to(ROOT)} — sheets: {', '.join(wb.sheetnames)}")
print(f"missing files referenced by data: {len(missing)}")
for r in missing:
    print("  ", r)
