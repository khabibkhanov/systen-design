"use client";

import Link from "next/link";
import { LINE_COLORS, MODULES } from "@/lib/syllabus";
import { useProgress } from "@/lib/progress";

type Props = { published: number[] };

export function RouteMap({ published }: Props) {
  const progress = useProgress();
  const isPublished = (n: number) => published.includes(n);
  const current = published.find((n) => !progress[n]?.passed);
  const passedCount = Object.values(progress).filter((p) => p.passed).length;

  return (
    <section id="xarita" className="scroll-mt-20">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold">Yo'nalish xaritasi</h2>
        <p className="text-muted text-sm">
          {passedCount} / 100 bekat o'tildi, {published.length} ta dars ochiq
        </p>
      </div>

      <ol className="space-y-10">
        {MODULES.map((m, i) => {
          const color = LINE_COLORS[i];
          const open = m.topics.some((t) => t.n === current);
          return (
            <li key={m.id}>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-sm font-semibold text-white"
                  style={{ background: color }}
                >
                  M{m.id}
                </span>
                <h3 className="font-semibold">{m.title}</h3>
              </div>

              <div className="grid grid-cols-5 gap-y-4 sm:grid-cols-10">
                {m.topics.map((t, j) => {
                  const pub = isPublished(t.n);
                  const passed = progress[t.n]?.passed;
                  const isCurrent = t.n === current;
                  // Line is drawn as two halves so row starts/ends have no stub (5 cols mobile, 10 cols desktop).
                  const leftCls = j === 0 ? "hidden" : j === 5 ? "hidden sm:block" : "block";
                  const rightCls = j === 9 ? "hidden" : j === 4 ? "hidden sm:block" : "block";
                  const lineBg = { background: pub ? color : "var(--rule)" };
                  const dot = (
                    <span
                      className={`relative z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                        isCurrent ? "ring-4 ring-offset-2 ring-offset-paper" : ""
                      }`}
                      style={{
                        background: passed ? color : "var(--paper)",
                        color: passed ? "#fff" : pub ? "var(--ink)" : "var(--muted)",
                        border: `2px ${pub ? "solid" : "dashed"} ${pub ? color : "var(--rule)"}`,
                        ...(isCurrent ? { ["--tw-ring-color" as string]: `${color}55` } : {}),
                      }}
                    >
                      {t.n}
                    </span>
                  );
                  return (
                    <div key={t.n} className="relative flex justify-center">
                      <span aria-hidden className={`absolute left-0 right-1/2 top-1/2 h-[3px] -translate-y-1/2 ${leftCls}`} style={lineBg} />
                      <span aria-hidden className={`absolute left-1/2 right-0 top-1/2 h-[3px] -translate-y-1/2 ${rightCls}`} style={lineBg} />
                      {pub ? (
                        <Link href={`/dars/${t.n}`} title={t.title} aria-label={`${t.n}-dars: ${t.title}`}>
                          {dot}
                        </Link>
                      ) : (
                        <span title={`${t.title} (hali yozilmagan)`}>{dot}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <details open={open} className="mt-4 group">
                <summary className="cursor-pointer text-sm text-muted hover:text-ink">
                  Mavzular ro'yxati
                </summary>
                <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
                  {m.topics.map((t) => (
                    <li key={t.n} className="flex gap-2">
                      <span className="w-7 shrink-0 tabular-nums text-muted">{t.n}.</span>
                      {isPublished(t.n) ? (
                        <Link href={`/dars/${t.n}`} className="hover:text-signal underline-offset-2 hover:underline">
                          {t.title}
                        </Link>
                      ) : (
                        <span className="text-muted">{t.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
