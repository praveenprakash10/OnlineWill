import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-shell flex items-center justify-between gap-6 py-7">
      <Link
        href="/"
        className="brand-mark text-[1.35rem] font-semibold text-foreground transition-opacity hover:opacity-80"
      >
        OnlineWill<span className="text-accent">.in</span>
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
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
