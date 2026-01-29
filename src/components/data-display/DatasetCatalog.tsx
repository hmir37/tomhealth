"use client";

import { useDatasets } from "@/hooks/useDatasets";

export function DatasetCatalog() {
  const { data: datasets, isLoading, error } = useDatasets();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-lg bg-[var(--color-bg-tertiary)]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-[var(--color-error)]">
        Failed to load datasets. Please try again later.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {datasets?.map((ds) => (
        <a
          key={ds.id}
          href={`/explore/${ds.slug}`}
          className="block rounded-lg border border-[var(--color-border)] p-4 transition-shadow hover:shadow-md"
        >
          <h2 className="font-semibold">{ds.title}</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {ds.description}
          </p>
          <span className="mt-2 inline-block text-xs text-[var(--color-text-muted)]">
            {ds.category}
          </span>
        </a>
      ))}
    </div>
  );
}
