import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line/70">
      <div className="site-shell flex items-center justify-between gap-6 py-4 sm:py-5">
        <Link
          href="/"
          className="brand-mark shrink-0 text-[1.25rem] font-semibold text-foreground transition-opacity hover:opacity-80 sm:text-[1.35rem]"
        >
          OnlineWill<span className="text-accent">.in</span>
        </Link>
        <nav
          aria-label="Primary"
          className="ml-auto flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground sm:gap-x-7 sm:text-xs"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
