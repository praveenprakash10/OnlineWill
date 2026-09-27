import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onlinewill.in"),
  title: {
    default: "OnlineWill.in — Wills & estate planning guides for India",
    template: "%s · OnlineWill.in",
  },
  description:
    "Clear articles on writing a will in India. OnlineWill.in is preparing a guided online will service—meanwhile, start with practical guides.",
  openGraph: {
    title: "OnlineWill.in",
    description:
      "Guides on wills and estate planning in India. Product coming soon.",
    url: "https://onlinewill.in",
    siteName: "OnlineWill.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlineWill.in",
    description:
      "Guides on wills and estate planning in India. Product coming soon.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
