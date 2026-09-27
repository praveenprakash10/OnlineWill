import type { MetadataRoute } from "next";
import { getAllArticles, SITE_URL } from "@/lib/articles";
import { getAllPages } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const pages = getAllPages().map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...pages,
    ...articles,
  ];
}
