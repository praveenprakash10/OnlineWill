import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags?: string[];
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

function ensureArticlesDirectory() {
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true });
  }
}

function getMarkdownFiles() {
  ensureArticlesDirectory();
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".md"));
}

async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(result);
}

export function getAllArticles(): ArticleMeta[] {
  const files = getMarkdownFiles();

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      readingTime: stats.text,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    } satisfies ArticleMeta;
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const contentHtml = await markdownToHtml(content);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    readingTime: stats.text,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    contentHtml,
  };
}

export function formatArticleDate(date: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
