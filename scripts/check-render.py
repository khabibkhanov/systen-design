# Opens every published lesson on a running server and reports mermaid blocks that failed to render.
# Usage: [NEXT_PUBLIC_COURSE=cs50] python3 scripts/check-render.py http://localhost:3123/<basePath> [from] [to]
import os
import sys
from playwright.sync_api import sync_playwright

base = sys.argv[1]
lo, hi = (int(sys.argv[2]), int(sys.argv[3])) if len(sys.argv) > 3 else (1, 100)
content = "cs50" if os.environ.get("NEXT_PUBLIC_COURSE") == "cs50" else "lessons"
lessons_dir = os.path.join(os.path.dirname(__file__), "..", "content", content)
nums = [n for n in range(lo, hi + 1) if os.path.exists(os.path.join(lessons_dir, f"{n:03d}.md"))]

bad = 0
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    for n in nums:
        errors.clear()
        page.goto(f"{base}/dars/{n}", wait_until="networkidle")
        page.wait_for_timeout(1200)
        expected = open(os.path.join(lessons_dir, f"{n:03d}.md"), encoding="utf8").read().count("```mermaid")
        rendered = page.locator(".lesson svg[id^='m']").count()
        failed_pre = page.locator(".lesson pre").evaluate_all(
            "els => els.filter(e => /^(flowchart|graph|sequenceDiagram|stateDiagram|classDiagram|erDiagram)/.test(e.innerText.trim())).length"
        )
        if rendered < expected or failed_pre or errors:
            bad += 1
            print(f"{n:03d}: mermaid {rendered}/{expected}, fallback={failed_pre}, errors={errors[:2]}")
    browser.close()
print(f"{len(nums)} dars tekshirildi, {bad} tasida muammo")
sys.exit(1 if bad else 0)
