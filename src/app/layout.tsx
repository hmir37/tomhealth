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
            <main className="mx-auto max-w-screen-xl px-4 py-6">
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
    <header className="border-b border-[var(--color-border)] bg-[var(--color-brand-dark)] text-white">
      <nav className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
        <a href="/" className="text-lg font-bold tracking-tight">
          tomhealth
        </a>
        <ul className="flex gap-6 text-sm">
          <li>
            <a href="/" className="hover:underline">
              Catalog
            </a>
          </li>
          <li>
            <a href="/compare" className="hover:underline">
              Compare
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-text-muted)]">
      <p>
        tomhealth · Data sourced from CDC Open Data APIs · Not an official CDC
        product
      </p>
    </footer>
  );
}
