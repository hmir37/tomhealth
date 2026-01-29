import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Providers } from "@/components/layout/Providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "tomhealth — CDC Data Explorer",
  description:
    "Explore, visualize, and compare public health data from the CDC Open Data ecosystem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg)] antialiased">
        <NuqsAdapter>
          <Providers>
            <Header />
            <main className="mx-auto max-w-screen-xl px-4 py-8">
              {children}
            </main>
            <Footer />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-[var(--color-brand-dark)] text-white shadow-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-0">
        <a href="/" className="flex items-center gap-3 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-lg font-black">
            T
          </span>
          <span className="text-xl font-bold tracking-tight">tomhealth</span>
        </a>
        <nav>
          <ul className="flex items-center gap-1 text-sm">
            <NavLink href="/" label="Catalog" />
            <NavLink href="/explore/covid-hospitalizations" label="Explorer" />
            <NavLink href="/compare" label="Compare" />
            <NavLink href="/about/covid-hospitalizations" label="About Data" />
          </ul>
        </nav>
      </div>
      <div className="h-1 bg-gradient-to-r from-[var(--color-series-1)] via-[var(--color-series-2)] to-[var(--color-series-3)]" />
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        className="inline-block rounded-md px-4 py-2 font-medium transition-colors hover:bg-white/10"
      >
        {label}
      </a>
    </li>
  );
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">tomhealth</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Public health data exploration platform
            </p>
          </div>
          <div className="text-right text-xs text-[var(--color-text-muted)]">
            <p>Data sourced from CDC Open Data APIs</p>
            <p className="mt-1">Not an official CDC product</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
