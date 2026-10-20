"use client";

import { useState } from "react";
import { saveProgress, useProgress } from "@/lib/progress";

export function AnswerBox({ n, title }: { n: number; title: string }) {
  const progress = useProgress();
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const value = draft ?? progress[n]?.answer ?? "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${n}-dars topshiriq javobi (${title}):\n\n${value}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="javob" className="mt-14 scroll-mt-20 border-t border-rule pt-10">
      <h2 className="mb-2 text-2xl font-semibold">Topshiriq javobi</h2>
      <p className="mb-4 max-w-[70ch] text-muted">
        Javobni shu yerga yozing - u brauzeringizda saqlanadi. Keyin nusxa olib chatga yuboring, tekshirib
        beraman.
      </p>
      <textarea
        value={value}
        onChange={(e) => {
          setDraft(e.target.value);
          saveProgress(n, { answer: e.target.value });
        }}
        rows={12}
        className="w-full max-w-[80ch] rounded-md border border-rule bg-sheet p-3 font-mono text-sm leading-relaxed focus:border-signal focus:outline-none"
        placeholder="Talablar, hisob-kitob, arxitektura, trade-offlar..."
      />
      <div className="mt-3">
        <button
          onClick={copy}
          disabled={!value.trim()}
          className="rounded-md border border-rule px-4 py-2 hover:border-muted disabled:opacity-40"
        >
          {copied ? "Nusxa olindi" : "Chat uchun nusxa olish"}
        </button>
      </div>
    </section>
  );
}
