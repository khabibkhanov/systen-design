// Validates lesson files: frontmatter title vs syllabus, quiz shape, forbidden dashes, required sections.
// Usage: node scripts/validate.mjs [from] [to]
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "content", "lessons");
const syllabusSrc = fs.readFileSync(path.join(root, "src/lib/syllabus.ts"), "utf8");
const titles = Object.fromEntries(
  [...syllabusSrc.matchAll(/t\((\d+), "([^"]+)"\)/g)].map((m) => [Number(m[1]), m[2]]),
);

const [from = 1, to = 100] = process.argv.slice(2).map(Number);
const REQUIRED = ["Ko'p uchraydigan xatolar", "Xulosa", "Amaliy topshiriq", "Manbalar"];
const pad = (n) => String(n).padStart(3, "0");
let failed = 0;

for (let n = from; n <= to; n++) {
  const md = path.join(dir, `${pad(n)}.md`);
  const qz = path.join(dir, `${pad(n)}.quiz.json`);
  const errs = [];
  if (!fs.existsSync(md)) errs.push("md yo'q");
  if (!fs.existsSync(qz)) errs.push("quiz yo'q");
  if (errs.length === 0) {
    const raw = fs.readFileSync(md, "utf8");
    const { data, content } = matter(raw);
    if (data.title !== titles[n]) errs.push(`title mos emas: "${data.title}"`);
    if (!Number.isFinite(Number(data.minutes))) errs.push("minutes yo'q");
    if (/[–—]/.test(raw)) errs.push("em/en-dash bor (md)");
    if (/^# /m.test(content)) errs.push("# sarlavha bor");
    for (const s of REQUIRED) if (!content.includes(`## ${s}`)) errs.push(`bo'lim yo'q: ${s}`);
    if (!content.includes("```mermaid")) errs.push("mermaid yo'q");
    if (!/\n\|.*\|\n\|[-| :]+\|/.test(content)) errs.push("jadval yo'q");
    const links = (content.split("## Manbalar")[1] ?? "").match(/\]\(https?:\/\//g) ?? [];
    if (links.length < 3) errs.push(`manba havolalari kam: ${links.length}`);
    const words = content.split(/\s+/).length;
    if (words < 1800) errs.push(`qisqa: ${words} so'z`);
    const qraw = fs.readFileSync(qz, "utf8");
    if (/[–—]/.test(qraw)) errs.push("em/en-dash bor (quiz)");
    try {
      const q = JSON.parse(qraw);
      if (q.questions?.length !== 10) errs.push(`savollar ${q.questions?.length}`);
      q.questions?.forEach((x, i) => {
        if (x.options?.length !== 4 || !(x.answer >= 0 && x.answer <= 3) || !x.why) errs.push(`savol ${i + 1} noto'g'ri`);
      });
    } catch (e) {
      errs.push(`quiz JSON xato: ${e.message}`);
    }
  }
  if (errs.length) {
    failed++;
    console.log(`${pad(n)}: ${errs.join("; ")}`);
  }
}
console.log(failed ? `\n${failed} ta darsda muammo` : `${from}-${to}: hammasi joyida`);
process.exit(failed ? 1 : 0);
