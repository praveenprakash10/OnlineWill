import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 sm:py-7">
      <Link
        href="/"
        className="brand-mark text-[1.25rem] font-semibold text-foreground transition-opacity hover:opacity-80 sm:text-[1.35rem]"
      >
        OnlineWill<span className="text-accent">.in</span>
      </Link>
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:gap-x-5"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
