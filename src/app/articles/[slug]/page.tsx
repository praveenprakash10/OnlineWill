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
        <p className="animate-rise text-sm text-muted">
          <Link href="/articles" className="hover:text-foreground">
            Articles
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="line-clamp-1">{article.title}</span>
        </p>

        <header className="animate-rise animate-rise-delay-1 border-b border-line pb-8 pt-6">
          <h1 className="brand-mark max-w-3xl text-4xl leading-[1.12] tracking-tight text-foreground md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            {article.description}
          </p>
        </header>

        <div className="article-layout animate-rise animate-rise-delay-2 mt-8">
          <div className="min-w-0">
            {article.cover ? (
              <figure className="article-cover overflow-hidden rounded-2xl">
                <CoverImage
                  src={article.cover}
                  alt={article.coverAlt ?? article.title}
                  width={1600}
                  height={900}
                  className="h-auto w-full object-cover"
                  priority
                  sizes="(max-width: 900px) 100vw, 800px"
                />
              </figure>
            ) : null}

            <div
              className="article-prose pt-8"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            <ArticleShare
              title={article.title}
              description={article.description}
              url={articleUrl(article.slug)}
            />
          </div>

          <aside className="article-sidebar" aria-label="Article details">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
                Author
              </p>
              <p className="text-foreground">
                {article.author ?? "OnlineWill.in"}
              </p>
            </div>

            <div className="mt-6 space-y-1 border-t border-line pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
                Published
              </p>
              <p>
                <time dateTime={article.date}>
                  {formatArticleDate(article.date)}
                </time>
              </p>
              {article.updated ? (
                <p className="text-sm">
                  Updated {formatArticleDate(article.updated)}
                </p>
              ) : null}
              <p className="text-sm">{article.readingTime}</p>
            </div>

            {article.tags && article.tags.length > 0 ? (
              <div className="mt-6 space-y-3 border-t border-line pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
                  Tags
                </p>
                <ul className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}
