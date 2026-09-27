import type { Root, Paragraph } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const YOUTUBE_RE =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

export function extractYouTubeId(url: string): string | null {
  const match = url.match(YOUTUBE_RE);
  return match?.[1] ?? null;
}

function youtubeEmbedHtml(videoId: string) {
  return [
    `<div class="video-embed">`,
    `<iframe`,
    `  src="https://www.youtube-nocookie.com/embed/${videoId}"`,
    `  title="YouTube video"`,
    `  loading="lazy"`,
    `  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"`,
    `  allowfullscreen`,
    `  referrerpolicy="strict-origin-when-cross-origin"`,
    `></iframe>`,
    `</div>`,
  ].join("");
}

function isYouTubeOnlyParagraph(node: Paragraph): string | null {
  const children = node.children.filter(
    (child) => !(child.type === "text" && child.value.trim() === ""),
  );

  if (children.length !== 1) return null;

  const child = children[0];

  if (child.type === "link") {
    return extractYouTubeId(child.url);
  }

  if (child.type === "text") {
    const trimmed = child.value.trim();
    if (!trimmed.includes("\n")) {
      return extractYouTubeId(trimmed);
    }
  }

  return null;
}

/** Paragraph that is only a YouTube URL → responsive embed. */
export const remarkYouTubeEmbeds: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (index === undefined || !parent) return;

      const videoId = isYouTubeOnlyParagraph(node);
      if (!videoId) return;

      parent.children.splice(index, 1, {
        type: "html",
        value: youtubeEmbedHtml(videoId),
      });
    });
  };
};

function escapeAttr(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/** Standalone markdown images → <figure> with optional caption (image title). */
export const remarkImageFigures: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (index === undefined || !parent) return;

      const children = node.children.filter(
        (child) => !(child.type === "text" && child.value.trim() === ""),
      );

      if (children.length !== 1 || children[0].type !== "image") return;

      const image = children[0];
      const alt = image.alt ?? "";
      const src = image.url;
      const caption = image.title;

      const img = `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async" class="article-image" />`;
      const html = caption
        ? `<figure class="article-figure">${img}<figcaption>${escapeHtml(caption)}</figcaption></figure>`
        : `<figure class="article-figure">${img}</figure>`;

      parent.children.splice(index, 1, {
        type: "html",
        value: html,
      });
    });
  };
};
