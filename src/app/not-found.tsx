import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-shell py-20 text-center">
      <h1 className="brand-mark text-4xl tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-4 text-muted">
        That article or page does not exist yet.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex font-medium text-accent underline-offset-4 hover:underline"
      >
        Back to OnlineWill.in
      </Link>
    </div>
  );
}
