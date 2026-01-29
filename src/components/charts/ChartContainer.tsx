"use client";

interface Props {
  datasetSlug: string;
}

export function ChartContainer({ datasetSlug }: Props) {
  return (
    <div className="flex h-96 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <p className="text-sm text-[var(--color-text-muted)]">
        Chart area for <strong>{datasetSlug}</strong> — will render a time-series
        line chart (visx) based on the active filters and dataset type.
      </p>
    </div>
  );
}
