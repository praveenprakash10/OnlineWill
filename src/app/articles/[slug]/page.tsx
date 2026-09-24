import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatArticleDate,
  getAllArticles,
  getArticleBySlug,
} from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="site-shell pb-16 pt-4">
      <p className="animate-rise text-sm text-muted">
        <Link href="/articles" className="hover:text-foreground">
          Articles
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{article.title}</span>
      </p>

      <header className="animate-rise animate-rise-delay-1 border-b border-line pb-8 pt-6">
        <p className="text-sm text-muted">
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          <span aria-hidden="true"> · </span>
          <span>{article.readingTime}</span>
        </p>
        <h1 className="brand-mark mt-3 text-4xl leading-[1.12] tracking-tight text-foreground md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {article.description}
        </p>
        {article.tags && article.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div
        className="article-prose animate-rise animate-rise-delay-2 pt-8"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </article>
  );
}
