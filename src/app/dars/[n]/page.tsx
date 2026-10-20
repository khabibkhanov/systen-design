import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLesson, publishedNumbers } from "@/lib/lessons";
import { LINE_COLORS, MODULES, moduleOf } from "@/lib/syllabus";
import { Markdown, headingsOf } from "@/components/markdown";
import { Quiz } from "@/components/quiz";
import { AnswerBox } from "@/components/answer-box";

export function generateStaticParams() {
  return publishedNumbers().map((n) => ({ n: String(n) }));
}

export async function generateMetadata({ params }: PageProps<"/dars/[n]">): Promise<Metadata> {
  const { n } = await params;
  const lesson = getLesson(Number(n));
  return { title: lesson ? `${lesson.n}. ${lesson.title}` : "Dars topilmadi" };
}

export default async function LessonPage({ params }: PageProps<"/dars/[n]">) {
  const { n: raw } = await params;
  const n = Number(raw);
  const lesson = getLesson(n);
  const mod = moduleOf(n);
  if (!lesson || !mod) notFound();

  const published = publishedNumbers();
  const prev = published.filter((x) => x < n).at(-1);
  const next = published.find((x) => x > n);
  const color = LINE_COLORS[mod.id - 1];
  const toc = headingsOf(lesson.body);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-8 text-sm">
          <div>
            <p className="mb-2 font-semibold" style={{ color }}>
              M{mod.id}. {mod.title}
            </p>
            <ol className="space-y-1.5 border-l-2 pl-3" style={{ borderColor: color }}>
              {mod.topics.map((t) => {
                const isOpen = published.includes(t.n);
                const active = t.n === n;
                return (
                  <li key={t.n} className={active ? "font-semibold" : isOpen ? "" : "text-muted"}>
                    {isOpen && !active ? (
                      <Link href={`/dars/${t.n}`} className="hover:text-signal">
                        {t.n}. {t.title}
                      </Link>
                    ) : (
                      <span>
                        {t.n}. {t.title}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          {toc.length > 0 && (
            <div>
              <p className="mb-2 font-semibold">Shu darsda</p>
              <ul className="space-y-1.5 text-muted">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="hover:text-ink">
                      {h.text}
                    </a>
                  </li>
                ))}
                {lesson.quiz && (
                  <li>
                    <a href="#test" className="hover:text-ink">Test</a>
                  </li>
                )}
                <li>
                  <a href="#javob" className="hover:text-ink">Topshiriq javobi</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </aside>

      <article className="min-w-0">
        <header className="mb-10 max-w-[70ch]">
          <p className="mb-3 text-sm text-muted">
            <span className="font-semibold" style={{ color }}>
              {n}-dars
            </span>{" "}
            / 100, {MODULES[mod.id - 1].title.toLowerCase()}, taxminan {lesson.minutes} daqiqa
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{lesson.title}</h1>
        </header>

        <Markdown source={lesson.body} />

        {lesson.quiz && <Quiz n={n} quiz={lesson.quiz} hasNext={next !== undefined} />}
        <AnswerBox n={n} title={lesson.title} />

        <nav className="mt-16 flex flex-wrap justify-between gap-4 border-t border-rule pt-6">
          {prev ? (
            <Link href={`/dars/${prev}`} className="text-muted hover:text-ink">
              Oldingi: {prev}-dars
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/dars/${next}`} className="font-medium text-signal">
              Keyingi: {next}-dars
            </Link>
          ) : (
            <span className="text-muted">Keyingi dars hali yozilmagan</span>
          )}
        </nav>
      </article>
    </div>
  );
}
