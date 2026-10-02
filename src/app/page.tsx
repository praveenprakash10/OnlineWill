import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <div className="site-shell pb-16 pt-4">
      <section className="animate-rise border-b border-line pb-10">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
          Guides for India
        </p>
        <h1 className="brand-mark mt-3 max-w-3xl text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
          OnlineWill.in
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Practical articles on wills, nominees, and estate planning—while we
          build a simple online will service.
        </p>
        <p className="mt-6 text-sm text-muted">
          Prefer the full archive?{" "}
          <Link
            href="/articles"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Browse all articles
          </Link>
          .
        </p>
      </section>

      <section className="pt-8" aria-labelledby="latest-articles">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2
            id="latest-articles"
            className="brand-mark text-2xl tracking-tight text-foreground"
          >
            Latest articles
          </h2>
        </div>
        <ArticleList articles={articles} />
      </section>
    </div>
  );
}
