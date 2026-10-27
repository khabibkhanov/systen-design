import { RouteMap } from "@/components/route-map";
import { ContinueLink } from "@/components/continue-link";
import { publishedNumbers } from "@/lib/lessons";
import { COURSE } from "@/lib/course";

export default function Home() {
  const published = publishedNumbers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <section className="mb-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {COURSE.heroTitle[0]}
            <br />
            {COURSE.heroTitle[1]}
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg text-muted">
            {COURSE.heroText}
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
          {COURSE.library.map((b) => (
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
