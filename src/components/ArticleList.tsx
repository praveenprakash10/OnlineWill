import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleMeta } from "@/lib/articles";

type ArticleListProps = {
  articles: ArticleMeta[];
};

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <p className="text-muted">
        No articles yet. Add a Markdown file in{" "}
        <code className="rounded bg-accent-soft px-1.5 py-0.5 text-sm">
          content/articles
        </code>
        .
      </p>
    );
  }

  return (
    <div>
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} index={index} />
      ))}
    </div>
  );
}
