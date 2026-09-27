import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPages, getPageBySlug } from "@/lib/pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return { title: "Page not found" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `https://onlinewill.in/${page.slug}`,
    },
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="site-shell pb-16 pt-4">
      <header className="animate-rise border-b border-line pb-8">
        <h1 className="brand-mark text-4xl tracking-tight text-foreground md:text-5xl">
          {page.title}
        </h1>
        {page.description ? (
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {page.description}
          </p>
        ) : null}
      </header>
      <div
        className="article-prose animate-rise animate-rise-delay-1 pt-8"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      />
    </article>
  );
}
