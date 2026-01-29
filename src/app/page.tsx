import { DatasetCatalog } from "@/components/data-display/DatasetCatalog";

export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <section className="mb-10 rounded-xl bg-gradient-to-br from-[var(--color-brand-dark)] to-[var(--color-brand)] px-8 py-12 text-white">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Public Health Data
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-white/80">
          Browse CDC datasets, visualize trends over time, compare regions, and
          filter by demographics. Gain deeper insight into the nation&apos;s
          health data.
        </p>
        <div className="mt-6 flex gap-3">
          <a
            href="/explore/covid-hospitalizations"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-brand-dark)] shadow transition hover:shadow-lg"
          >
            Start Exploring
          </a>
          <a
            href="/compare"
            className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
          >
            Compare Regions
          </a>
        </div>
      </section>

      {/* Quick stats */}
      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Datasets Available" value="6" />
        <StatCard label="Conditions Tracked" value="120+" />
        <StatCard label="States & Territories" value="56" />
        <StatCard label="Years of Data" value="10+" />
      </section>

      {/* Catalog */}
      <section>
        <h2 className="mb-1 text-2xl font-bold">Dataset Catalog</h2>
        <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
          Select a dataset to open the interactive explorer with charts,
          filters, and data tables.
        </p>
        <DatasetCatalog />
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-4 text-center">
      <p className="text-2xl font-bold text-[var(--color-brand)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--color-text-muted)]">{label}</p>
    </div>
  );
}
