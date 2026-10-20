"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { TOPICS } from "@/lib/syllabus";

export function ContinueLink({ published }: { published: number[] }) {
  const progress = useProgress();
  const next = published.find((n) => !progress[n]?.passed);

  if (next === undefined) {
    return (
      <p className="text-muted">
        Ochiq darslarning hammasi o'tildi. Keyingi darsni chatda so'rang.
      </p>
    );
  }

  const topic = TOPICS.find((t) => t.n === next);
  return (
    <Link
      href={`/dars/${next}`}
      className="inline-flex flex-col rounded-lg bg-signal px-5 py-3 text-white hover:opacity-90"
    >
      <span className="text-sm opacity-80">{next}-darsni boshlash</span>
      <span className="font-semibold">{topic?.title}</span>
    </Link>
  );
}
