import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type QuizQuestion = { q: string; options: string[]; answer: number; why: string };
export type Quiz = { passScore: number; questions: QuizQuestion[] };
export type Lesson = { n: number; title: string; minutes: number; body: string; quiz: Quiz | null };

const DIR = path.join(process.cwd(), "content", "lessons");
const pad = (n: number) => String(n).padStart(3, "0");

export function publishedNumbers(): number[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /^\d{3}\.md$/.test(f))
    .map((f) => Number(f.slice(0, 3)))
    .sort((a, b) => a - b);
}

export function getLesson(n: number): Lesson | null {
  const file = path.join(DIR, `${pad(n)}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const quizFile = path.join(DIR, `${pad(n)}.quiz.json`);
  const quiz = fs.existsSync(quizFile) ? (JSON.parse(fs.readFileSync(quizFile, "utf8")) as Quiz) : null;
  return { n, title: String(data.title), minutes: Number(data.minutes ?? 30), body: content, quiz };
}
