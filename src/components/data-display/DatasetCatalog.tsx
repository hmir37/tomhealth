"use client";

import { useDatasets } from "@/hooks/useDatasets";

const CATEGORY_COLORS: Record<string, string> = {
  "Infectious Disease": "bg-red-100 text-red-800",
  "Chronic Conditions": "bg-purple-100 text-purple-800",
  Immunization: "bg-green-100 text-green-800",
  "Environmental Health": "bg-teal-100 text-teal-800",
  Mortality: "bg-gray-200 text-gray-800",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Infectious Disease": "\u{1F9A0}",
  "Chronic Conditions": "\u{1FA7A}",
  Immunization: "\u{1F489}",
  "Environmental Health": "\u{1F33F}",
  Mortality: "\u{1F4CA}",
};

export function DatasetCatalog() {
  const { data: datasets, isLoading, error } = useDatasets();

  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-44 animate-pulse rounded-xl bg-[var(--color-bg-tertiary)]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-[var(--color-error)] bg-red-50 p-6 text-center">
        <p className="font-semibold text-[var(--color-error)]">
          Failed to load datasets
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {datasets?.map((ds) => (
        <a
          key={ds.id}
          href={`/explore/${ds.slug}`}
          className="group block rounded-xl border border-[var(--color-border)] bg-white p-5 transition-all hover:border-[var(--color-brand)] hover:shadow-lg"
        >
          <div className="mb-3 flex items-start justify-between">
            <span className="text-2xl">
              {CATEGORY_ICONS[ds.category] || "\u{1F4C1}"}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                CATEGORY_COLORS[ds.category] || "bg-gray-100 text-gray-700"
              }`}
            >
              {ds.category}
            </span>
          </div>
          <h3 className="font-semibold leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)]">
            {ds.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {ds.description}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span>Updated {ds.updateFrequency.toLowerCase()}</span>
            <span className="font-medium text-[var(--color-brand)] opacity-0 transition-opacity group-hover:opacity-100">
              Explore →
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
