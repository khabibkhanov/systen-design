import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mermaid } from "./mermaid";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/['ʻʼ]/g, "")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-|-$/g, "");

const textOf = (children: React.ReactNode): string =>
  Array.isArray(children) ? children.map(textOf).join("") : typeof children === "string" ? children : "";

export function Markdown({ source }: { source: string }) {
  return (
    <div className="lesson">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 id={slug(textOf(children))}>{children}</h2>,
          a: ({ href, children }) => (
            <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {children}
            </a>
          ),
          pre: ({ children }) => {
            // Mermaid blocks render their own container, so unwrap them from <pre>.
            const child = Array.isArray(children) ? children[0] : children;
            if (
              child &&
              typeof child === "object" &&
              "props" in child &&
              (child.props as { className?: string }).className === "language-mermaid"
            ) {
              return <Mermaid code={String((child.props as { children: string }).children).trim()} />;
            }
            return <pre>{children}</pre>;
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

export function headingsOf(source: string) {
  return source
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const text = l.slice(3).trim();
      return { text, id: slug(text) };
    });
}
