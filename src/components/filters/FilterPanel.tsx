"use client";

interface Props {
  datasetSlug: string;
}

export function FilterPanel({ datasetSlug }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
        Filters
      </h2>
      <p className="text-xs text-[var(--color-text-secondary)]">
        Dynamic filters for <strong>{datasetSlug}</strong> will be generated
        from dataset metadata (dimensions, valid values, dependencies).
      </p>
      {/* Placeholder slots for filter controls */}
      <div className="space-y-3">
        <FilterPlaceholder label="Time Range" />
        <FilterPlaceholder label="Geography" />
        <FilterPlaceholder label="Demographics" />
        <FilterPlaceholder label="Indicator" />
      </div>
    </div>
  );
}

function FilterPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded border border-dashed border-[var(--color-border)] p-3">
      <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
    </div>
  );
}
