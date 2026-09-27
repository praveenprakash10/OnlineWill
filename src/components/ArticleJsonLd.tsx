import type { ArticleMeta } from "@/lib/articles";
import { absoluteUrl, articleUrl, SITE_URL } from "@/lib/articles";

type ArticleJsonLdProps = {
  article: ArticleMeta;
};

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      "@type": "Organization",
      name: article.author ?? "OnlineWill.in",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "OnlineWill.in",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl(article.slug),
    },
    ...(article.cover
      ? { image: [absoluteUrl(article.cover)] }
      : {}),
    keywords: article.tags?.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
