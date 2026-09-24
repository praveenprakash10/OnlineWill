import Link from "next/link";
import {
  formatArticleDate,
  type ArticleMeta,
} from "@/lib/articles";

type ArticleCardProps = {
  article: ArticleMeta;
  index?: number;
};

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const delayClass =
    index === 0
      ? "animate-rise-delay-1"
      : index === 1
        ? "animate-rise-delay-2"
        : "animate-rise-delay-3";

  return (
    <article
      className={`group border-b border-line py-7 first:pt-0 last:border-b-0 ${delayClass} animate-rise`}
    >
      <p className="text-sm text-muted">
        <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
        <span aria-hidden="true"> · </span>
        <span>{article.readingTime}</span>
      </p>
      <h2 className="brand-mark mt-2 text-2xl leading-snug tracking-tight text-foreground md:text-[1.7rem]">
        <Link
          href={`/articles/${article.slug}`}
          className="transition-colors group-hover:text-accent"
        >
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
        {article.description}
      </p>
      <Link
        href={`/articles/${article.slug}`}
        className="mt-4 inline-flex text-sm font-medium text-accent underline-offset-4 transition-all hover:underline"
      >
        Read article
      </Link>
    </article>
  );
}
