import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { ArticleShare } from "@/components/ArticleShare";
import { CoverImage } from "@/components/CoverImage";
import {
  absoluteUrl,
  articleUrl,
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

  const url = articleUrl(article.slug);
  const cover = article.cover ? absoluteUrl(article.cover) : undefined;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author ?? "OnlineWill.in" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      siteName: "OnlineWill.in",
      locale: "en_IN",
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      tags: article.tags,
      ...(cover
        ? {
            images: [
              {
                url: cover,
                alt: article.coverAlt ?? article.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: article.title,
      description: article.description,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="pb-16 pt-4">
      <ArticleJsonLd article={article} />

      <div className="site-shell">
        <div className="article-column">
          <p className="animate-rise text-sm text-muted">
            <Link href="/articles" className="hover:text-foreground">
              Articles
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="line-clamp-1">{article.title}</span>
          </p>

          <header className="animate-rise animate-rise-delay-1 border-b border-line pb-8 pt-6">
            <p className="text-sm text-muted">
              <time dateTime={article.date}>
                {formatArticleDate(article.date)}
              </time>
              {article.updated ? (
                <>
                  <span aria-hidden="true"> · </span>
                  <span>Updated {formatArticleDate(article.updated)}</span>
                </>
              ) : null}
              <span aria-hidden="true"> · </span>
              <span>{article.readingTime}</span>
            </p>
            <h1 className="brand-mark mt-3 text-4xl leading-[1.12] tracking-tight text-foreground md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
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

          {article.cover ? (
            <figure className="article-cover animate-rise animate-rise-delay-2 mt-8 overflow-hidden rounded-2xl">
              <CoverImage
                src={article.cover}
                alt={article.coverAlt ?? article.title}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </figure>
          ) : null}

          <div
            className="article-prose animate-rise animate-rise-delay-3 pt-8"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          <ArticleShare
            title={article.title}
            description={article.description}
            url={articleUrl(article.slug)}
          />
        </div>
      </div>
    </article>
  );
}
