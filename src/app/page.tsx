import { RouteMap } from "@/components/route-map";
import { ContinueLink } from "@/components/continue-link";
import { publishedNumbers } from "@/lib/lessons";

const LIBRARY = [
  { title: "Designing Data-Intensive Applications, 2-nashr (2026)", by: "Kleppmann, Riccomini", href: "https://www.oreilly.com/library/view/designing-data-intensive/9781098119058/" },
  { title: "Database Internals", by: "Alex Petrov", href: "https://www.databass.dev/" },
  { title: "Understanding Distributed Systems", by: "Roberto Vitillo", href: "https://understandingdistributed.systems/" },
  { title: "Site Reliability Engineering", by: "Google", href: "https://sre.google/sre-book/table-of-contents/" },
  { title: "System Design Interview, 1-2 jild", by: "Alex Xu", href: "https://bytebytego.com/" },
  { title: "6.5840 Distributed Systems", by: "MIT", href: "https://pdos.csail.mit.edu/6.824/" },
  { title: "Amazon Builders' Library", by: "AWS", href: "https://aws.amazon.com/builders-library/" },
  { title: "System Design Primer", by: "donnemartin", href: "https://github.com/donnemartin/system-design-primer" },
];

export default function Home() {
  const published = publishedNumbers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <section className="mb-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            System design:
            <br />
            100 bekatlik yo'l
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg text-muted">
            Har kuni bitta mavzu. Har darsda ichki mexanika, trade-offlar, real tizimlardan misollar,
            test va loyihalash topshirig'i. Test o'tilgach, keyingi dars tayyorlanadi.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <ContinueLink published={published} />
          <p className="text-sm text-muted">
            Topshiriq javobini sahifadan nusxa olib chatga yuboring - tekshirib, xatolarni ko'rsataman.
          </p>
        </div>
      </section>

      <RouteMap published={published} />

      <section className="mt-20 border-t border-rule pt-10">
        <h2 className="mb-6 text-2xl font-semibold">Asosiy manbalar</h2>
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {LIBRARY.map((b) => (
            <li key={b.href}>
              <a href={b.href} target="_blank" rel="noreferrer" className="font-medium hover:text-signal">
                {b.title}
              </a>
              <span className="text-muted">, {b.by}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
