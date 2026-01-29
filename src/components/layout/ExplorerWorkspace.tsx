"use client";

import { FilterPanel } from "@/components/filters/FilterPanel";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { MetadataDrawer } from "@/components/data-display/MetadataDrawer";
import { DATASET_REGISTRY } from "@/lib/constants/datasets";

interface Props {
  datasetSlug: string;
}

export function ExplorerWorkspace({ datasetSlug }: Props) {
  const dataset = DATASET_REGISTRY.find((d) => d.slug === datasetSlug);
  const title = dataset?.title || datasetSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div>
      {/* Header bar */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="text-sm text-[var(--color-brand)] hover:underline"
            >
              Catalog
            </a>
            <span className="text-sm text-[var(--color-text-muted)]">/</span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {datasetSlug}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold">{title}</h1>
          {dataset && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {dataset.description} · Updated{" "}
              {dataset.updateFrequency.toLowerCase()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/about/${dataset?.id || datasetSlug}`}
            className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
          >
            Methodology
          </a>
          <MetadataDrawer datasetSlug={datasetSlug} />
        </div>
      </div>

      {/* Main content: sidebar + chart */}
      <div className="flex gap-6">
        <aside className="w-64 shrink-0 rounded-xl border border-[var(--color-border)] bg-white p-5">
          <FilterPanel datasetSlug={datasetSlug} />
        </aside>

        <section className="min-w-0 flex-1">
          <ChartContainer datasetSlug={datasetSlug} />
        </section>
      </div>
    </div>
  );
}
