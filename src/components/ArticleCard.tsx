import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
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
      className={`group grid gap-5 border-b border-line py-8 first:pt-0 last:border-b-0 md:grid-cols-[200px_1fr] md:items-start ${delayClass} animate-rise`}
    >
      {article.cover ? (
        <Link
          href={`/articles/${article.slug}`}
          className="relative aspect-[16/10] overflow-hidden rounded-xl bg-accent-soft"
        >
          <CoverImage
            src={article.cover}
            alt={article.coverAlt ?? article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </Link>
      ) : (
        <div
          className="hidden aspect-[16/10] rounded-xl bg-accent-soft md:block"
          aria-hidden="true"
        />
      )}

      <div>
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
      </div>
    </article>
  );
}
