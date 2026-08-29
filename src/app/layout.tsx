import type { Metadata } from "next";
import { Archivo, EB_Garamond, Architects_Daughter } from "next/font/google";
import "./globals.css";

/** The cover hand: the imprint's own voice, for headings only. */
const display = Archivo({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

/** The book hand: what the text of these novels is set in. */
const garamond = EB_Garamond({
  variable: "--font-prose-face",
  subsets: ["latin"],
  display: "swap",
});

/** The annotating hand: the scholar writing in the margins of the plate. */
const hand = Architects_Daughter({
  variable: "--font-hand-face",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
import { ReadingProvider } from "@/lib/reading";
import RealmToggle from "@/components/RealmToggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ars Arcanum — a concept redesign",
  description:
    "An unofficial concept redesign for Brandon Sanderson's work: a reader's instrument for a universe with no correct reading order.",
};

const NAV = [
  { href: "/", label: "Atlas" },
  { href: "/library", label: "Library" },
  { href: "/systems", label: "Systems" },
  { href: "/workbench", label: "Workbench" },
  { href: "/workshop", label: "Workshop" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${garamond.variable} ${hand.variable} h-full antialiased`}
    >
      <head>
        {/* Settle the realm before first paint so nobody sees the wrong one flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem("ars-arcanum:realm");document.documentElement.dataset.realm=(s==="cognitive"||s==="physical")?s:(matchMedia("(prefers-color-scheme: dark)").matches?"cognitive":"physical")}catch(e){}`,
          }}
        />
      </head>
      <body className="relative z-10 flex min-h-full flex-col">
        <ReadingProvider>
          <header className="sticky top-0 z-30 border-b border-rule bg-stock/92 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-7 gap-y-2 px-5 py-3">
              <Link href="/" className="flex items-baseline gap-2 text-[22px] italic leading-none">
                <span aria-hidden className="not-italic" style={{ color: "var(--brand)" }}>
                  &#9670;
                </span>
                Ars&nbsp;Arcanum
              </Link>
              <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="text-[16px] text-ink-soft underline-offset-4 transition hover:text-accent hover:underline"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="ml-auto self-center">
                <RealmToggle />
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
            {children}
          </main>

          <footer className="border-t border-rule">
            <div className="mx-auto max-w-6xl px-5 py-8">
              <p className="stamp">Unofficial concept redesign</p>
              <p className="hand mt-2 max-w-2xl text-[16px]">
                A speculative design study, not affiliated with or endorsed by
                Brandon Sanderson or Dragonsteel Books. Titles, worlds and
                characters belong to their author; everything here is an
                argument about how a site for that work might behave.
              </p>
            </div>
          </footer>
        </ReadingProvider>
      </body>
    </html>
  );
}
