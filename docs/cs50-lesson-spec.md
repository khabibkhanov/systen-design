# CS50 kursi: dars yozish standarti

`docs/lesson-spec.md` (system design) dagi til, uslub, manba, mermaid va test qoidalari shu kursga ham to'liq amal qiladi. Bu fayl faqat farqlarni belgilaydi.

## Kurs

- Dasturi: CS50x 2026 ketma-ketligi (C, Python, SQL, HTML/CSS/JS, Flask, AI, final project), 60 dars, 6 modul. Mavzular `src/lib/syllabus-cs50.ts` da.
- CS50 materiallari (ma'ruza, notes, problem set) tarjima qilinmaydi va ko'chirilmaydi. Mavzu o'z so'zimiz bilan, chuqurroq yoritiladi; CS50 sahifalari manba sifatida havola qilinadi.
- CS50 problem set shartlari qayta yozilmaydi. Amaliy topshiriq o'zimizniki, lekin o'sha ko'nikmani mashq qildiradi.

## O'quvchi

5 yillik tajribali full-stack muhandis (Node.js, Next.js, PostgreSQL, Redis). C va past daraja unga yangi bo'lishi mumkin. Asosni "bolalarcha" tushuntirmang, lekin bitta qadamni ham tashlab ketmang: maqsad - fundamentalni to'liq yopish. Node.js/TypeScript bilan taqqoslash foydali bo'lsa, qo'shing.

## Fayllar

- `content/cs50/NNN.md` va `content/cs50/NNN.quiz.json` (NNN - uch xonali raqam).
- Frontmatter `title` - `src/lib/syllabus-cs50.ts` dagi nom bilan aynan bir xil.

## Majburiy tuzilma

1. `## Bu dars nima uchun kerak` - muammo, oldingi darslar bilan bog'liqlik, darsdan keyin nimani bila olish (ro'yxat).
2. Nazariya va ichki mexanika bo'limlari (3-7 ta `##`). Kod misollari to'liq, kompilyatsiya qilinadigan va ishga tushiriladigan bo'lsin (C uchun `clang` buyrug'i va natijasi bilan). Kodni yozishdan oldin lokal tekshiring.
3. Kamida bitta taqqoslash jadvali.
4. Kamida bitta mermaid diagramma.
5. Raqamlar va hisob-kitob (qadamlar soni, bayt, vaqt) ochiq formulalar bilan.
6. `## Ko'p uchraydigan xatolar` (5-8), `## Xulosa` (5-8 band).
7. `## Amaliy topshiriq` - dasturlash topshirig'i (C yoki mavzu tili), 4-6 aniq qadam, "Yaxshi javobda bo'lishi kerak bo'lgan narsalar:" ro'yxati. Oxirgi gap: "Javobni pastdagi maydonga yozib, chatga yuboring."
8. `## Manbalar` - 4-8 ta havola, har birida qaysi bo'lim ekani.

Hajm: 2500-5000 so'z. Test: 10 savol, 4 variant, o'tish chegarasi 80%.

## Tekshirish

```bash
NEXT_PUBLIC_COURSE=cs50 node scripts/validate.mjs N N
```
