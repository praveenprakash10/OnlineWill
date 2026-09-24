import type { Metadata } from "next";
import { ArticleList } from "@/components/ArticleList";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "All OnlineWill.in articles on wills, nominees, and estate planning in India.",
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="site-shell pb-16 pt-4">
      <section className="animate-rise border-b border-line pb-8">
        <h1 className="brand-mark text-4xl tracking-tight text-foreground md:text-5xl">
          Articles
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Guides that will live under Articles when the OnlineWill.in product
          launches. Post URLs stay the same.
        </p>
      </section>
      <section className="pt-8" aria-label="All articles">
        <ArticleList articles={articles} />
      </section>
    </div>
  );
}
