// One codebase, several course zones. Each Vercel project sets NEXT_PUBLIC_COURSE and is served
// under its own basePath in the "courses" hub (Next.js multi-zones).

export type CourseId = "system-design" | "cs50";
type Book = { title: string; by: string; href: string };

export type Course = {
  id: CourseId;
  name: string;
  description: string;
  heroTitle: [string, string];
  heroText: string;
  contentDir: string; // folder under content/
  progressKey: string;
  library: Book[];
};

const COURSES: Record<CourseId, Course> = {
  "system-design": {
    id: "system-design",
    name: "System Design",
    description: "System design bo'yicha o'zbek tilidagi 100 darslik chuqur kurs",
    heroTitle: ["System design:", "100 bekatlik yo'l"],
    heroText:
      "Har kuni bitta mavzu. Har darsda ichki mexanika, trade-offlar, real tizimlardan misollar, test va loyihalash topshirig'i. Test o'tilgach, keyingi dars tayyorlanadi.",
    contentDir: "lessons",
    progressKey: "sd-uz-progress",
    library: [
      { title: "Designing Data-Intensive Applications, 2-nashr (2026)", by: "Kleppmann, Riccomini", href: "https://www.oreilly.com/library/view/designing-data-intensive/9781098119058/" },
      { title: "Database Internals", by: "Alex Petrov", href: "https://www.databass.dev/" },
      { title: "Understanding Distributed Systems", by: "Roberto Vitillo", href: "https://understandingdistributed.systems/" },
      { title: "Site Reliability Engineering", by: "Google", href: "https://sre.google/sre-book/table-of-contents/" },
      { title: "System Design Interview, 1-2 jild", by: "Alex Xu", href: "https://bytebytego.com/" },
      { title: "6.5840 Distributed Systems", by: "MIT", href: "https://pdos.csail.mit.edu/6.824/" },
      { title: "Amazon Builders' Library", by: "AWS", href: "https://aws.amazon.com/builders-library/" },
      { title: "System Design Primer", by: "donnemartin", href: "https://github.com/donnemartin/system-design-primer" },
    ],
  },
  cs50: {
    id: "cs50",
    name: "CS50",
    description: "Harvard CS50 dasturi asosida o'zbek tilidagi 60 darslik chuqur computer science kursi",
    heroTitle: ["Computer science:", "CS50 asosida 60 dars"],
    heroText:
      "CS50x ketma-ketligi: C, xotira, algoritmlar, ma'lumotlar tuzilmalari, Python, SQL, web, xavfsizlik va AI. Har darsda ichki mexanika, kod, test va dasturlash topshirig'i. Test o'tilgach, keyingi dars tayyorlanadi.",
    contentDir: "cs50",
    progressKey: "cs50-uz-progress",
    library: [
      { title: "CS50x 2026", by: "Harvard, David J. Malan", href: "https://cs50.harvard.edu/x/2026/" },
      { title: "The C Programming Language, 2-nashr", by: "Kernighan, Ritchie", href: "https://www.cs.princeton.edu/~bwk/cbook.html" },
      { title: "Computer Systems: A Programmer's Perspective", by: "Bryant, O'Hallaron", href: "https://csapp.cs.cmu.edu/" },
      { title: "Introduction to Algorithms (CLRS), 4-nashr", by: "Cormen, Leiserson, Rivest, Stein", href: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/" },
      { title: "The Art of Computer Programming", by: "Donald Knuth", href: "https://www-cs-faculty.stanford.edu/~knuth/taocp.html" },
      { title: "Python documentation", by: "Python Software Foundation", href: "https://docs.python.org/3/" },
      { title: "SQLite documentation", by: "SQLite", href: "https://sqlite.org/docs.html" },
      { title: "MDN Web Docs", by: "Mozilla", href: "https://developer.mozilla.org/" },
    ],
  },
};

export const COURSE_ID: CourseId = process.env.NEXT_PUBLIC_COURSE === "cs50" ? "cs50" : "system-design";
export const COURSE: Course = COURSES[COURSE_ID];
