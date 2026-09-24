export function SiteFooter() {
  return (
    <footer className="site-shell mt-auto border-t border-line py-10 text-sm text-muted">
      <p>
        © {new Date().getFullYear()} OnlineWill.in — guides on wills and estate
        planning in India.
      </p>
      <p className="mt-2 max-w-xl">
        Articles are educational and not legal advice. The will-creation product
        is coming soon; until then, the homepage features these articles.
      </p>
    </footer>
  );
}
