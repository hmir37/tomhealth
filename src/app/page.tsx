import { DatasetCatalog } from "@/components/data-display/DatasetCatalog";

export default function HomePage() {
  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Explore Public Health Data
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Browse CDC datasets, visualize trends, and compare regions. Select a
          dataset below to get started.
        </p>
      </section>
      <DatasetCatalog />
    </div>
  );
}
