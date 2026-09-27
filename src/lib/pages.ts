import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import {
  remarkImageFigures,
  remarkYouTubeEmbeds,
} from "@/lib/remark-media";

const pagesDirectory = path.join(process.cwd(), "content/pages");

export type PageMeta = {
  slug: string;
  title: string;
  description: string;
};

export type Page = PageMeta & {
  contentHtml: string;
};

async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkYouTubeEmbeds)
    .use(remarkImageFigures)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(result);
}

export function getAllPages(): PageMeta[] {
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(pagesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(
        path.join(pagesDirectory, filename),
        "utf8",
      );
      const { data } = matter(fileContents);

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
      };
    });
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const fullPath = path.join(pagesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = await markdownToHtml(content);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    contentHtml,
  };
}
