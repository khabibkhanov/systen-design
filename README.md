# System Design - 100 dars

O'zbek tilidagi 100 darslik system design kursi. Next.js (App Router) + Tailwind, Vercel'da.

## Tuzilma

- `src/lib/syllabus.ts` - 100 mavzu, 10 modul (yagona manba).
- `content/lessons/NNN.md` - dars matni (frontmatter: `title`, `minutes`). Mermaid diagrammalar ```` ```mermaid ```` blokida.
- `content/lessons/NNN.quiz.json` - test: `{ passScore, questions: [{ q, options, answer, why }] }`.
- Progress (test natijasi, topshiriq javobi) brauzer `localStorage`ida saqlanadi.

## Yangi dars qo'shish

1. `content/lessons/NNN.md` va `NNN.quiz.json` yaratish (NNN - uch xonali raqam).
2. Commit va `main` ga push - Vercel avtomatik deploy qiladi. Dars xaritada avtomatik ochiladi.

## Dars standarti

Har bir dars: maqsad, nazariya va ichki mexanika, trade-offlar, real tizimlardan misol, diagramma, hisob-kitob,
ko'p uchraydigan xatolar, xulosa, amaliy topshiriq (baholash mezonlari bilan), manbalar (havolalar bilan).
Test: 10 savol, o'tish chegarasi 80%.
Matnda em-dash ishlatilmaydi, faqat "-".

## Lokal ishga tushirish

```bash
npm install
npm run dev
```
