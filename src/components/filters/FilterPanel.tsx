"use client";

import { useState } from "react";

interface Props {
  datasetSlug: string;
  onFiltersChange?: (filters: FilterState) => void;
}

export interface FilterState {
  timeRange: string;
  geography: string;
  ageGroup: string;
  indicator: string;
}

const TIME_RANGES = [
  "All Time",
  "Last 12 Months",
  "Last 3 Years",
  "Last 5 Years",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
];

const GEOGRAPHIES = [
  "National",
  "California",
  "Texas",
  "New York",
  "Florida",
  "Illinois",
  "Pennsylvania",
  "Ohio",
  "Georgia",
];

const AGE_GROUPS = [
  "All Ages",
  "0-17",
  "18-49",
  "50-64",
  "65+",
];

const INDICATORS: Record<string, string[]> = {
  "covid-hospitalizations": [
    "Total Hospitalizations",
    "ICU Admissions",
    "Bed Utilization %",
    "7-Day Average",
  ],
  "flu-surveillance": [
    "ILI Activity Level",
    "% Positive Tests",
    "Outpatient Visits",
    "Pediatric Deaths",
  ],
  default: ["Primary Indicator", "Secondary Indicator", "Rate per 100K"],
};

export function FilterPanel({ datasetSlug, onFiltersChange }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    timeRange: "All Time",
    geography: "National",
    ageGroup: "All Ages",
    indicator:
      (INDICATORS[datasetSlug] || INDICATORS.default)[0],
  });

  const update = (key: keyof FilterState, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFiltersChange?.(next);
  };

  const indicators = INDICATORS[datasetSlug] || INDICATORS.default;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
          Filters
        </h2>
        <button
          onClick={() => {
            const reset: FilterState = {
              timeRange: "All Time",
              geography: "National",
              ageGroup: "All Ages",
              indicator: indicators[0],
            };
            setFilters(reset);
            onFiltersChange?.(reset);
          }}
          className="text-xs text-[var(--color-brand)] hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Active filter chips */}
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(filters).map(([key, val]) => {
          if (
            val === "All Time" ||
            val === "National" ||
            val === "All Ages" ||
            val === indicators[0]
          )
            return null;
          return (
            <span
              key={key}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--color-brand-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-brand-dark)]"
            >
              {val}
              <button
                onClick={() =>
                  update(
                    key as keyof FilterState,
                    key === "timeRange"
                      ? "All Time"
                      : key === "geography"
                        ? "National"
                        : key === "ageGroup"
                          ? "All Ages"
                          : indicators[0]
                  )
                }
                className="ml-0.5 hover:text-[var(--color-error)]"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      <SelectFilter
        label="Time Range"
        value={filters.timeRange}
        options={TIME_RANGES}
        onChange={(v) => update("timeRange", v)}
      />
      <SelectFilter
        label="Geography"
        value={filters.geography}
        options={GEOGRAPHIES}
        onChange={(v) => update("geography", v)}
      />
      <SelectFilter
        label="Age Group"
        value={filters.ageGroup}
        options={AGE_GROUPS}
        onChange={(v) => update("ageGroup", v)}
      />
      <SelectFilter
        label="Indicator"
        value={filters.indicator}
        options={indicators}
        onChange={(v) => update("indicator", v)}
      />

      {/* Filter summary */}
      <div className="rounded-lg bg-[var(--color-bg-secondary)] p-3 text-xs text-[var(--color-text-secondary)]">
        <span className="font-medium">Showing:</span> {filters.indicator},{" "}
        {filters.ageGroup}, {filters.geography}, {filters.timeRange}
      </div>
    </div>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand-light)]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
