"use client";

import { useState } from "react";
import { TimeSeriesChart } from "./TimeSeriesChart";
import { HorizontalBarChart } from "./BarChart";
import { DataTable } from "@/components/data-display/DataTable";
import { DATASET_MOCK_MAP, MOCK_STATE_DATA } from "@/lib/constants/mockData";

interface Props {
  datasetSlug: string;
}

type ViewMode = "line" | "bar" | "table";

export function ChartContainer({ datasetSlug }: Props) {
  const [view, setView] = useState<ViewMode>("line");
  const [showCI, setShowCI] = useState(true);

  const seriesData = DATASET_MOCK_MAP[datasetSlug] || DATASET_MOCK_MAP["covid-hospitalizations"];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2.5">
        <div className="flex gap-1">
          {(["line", "bar", "table"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                view === mode
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
              }`}
            >
              {mode === "line" ? "Time Series" : mode === "bar" ? "Rankings" : "Data Table"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {view === "line" && (
            <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <input
                type="checkbox"
                checked={showCI}
                onChange={(e) => setShowCI(e.target.checked)}
                className="rounded"
              />
              Confidence Interval
            </label>
          )}
          <button className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]">
            Export CSV
          </button>
          <button className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]">
            Share Link
          </button>
        </div>
      </div>

      {/* Chart area */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
        {view === "line" && (
          <TimeSeriesChart
            data={seriesData}
            showCI={showCI}
            title={`${datasetSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Monthly Trend`}
          />
        )}
        {view === "bar" && (
          <div>
            <h3 className="mb-4 text-sm font-semibold">
              Rate per 100K Population by State — Current Period
            </h3>
            <HorizontalBarChart data={MOCK_STATE_DATA} maxItems={15} />
          </div>
        )}
        {view === "table" && <DataTable data={seriesData} />}
      </div>

      {/* Caveat banners */}
      <div className="space-y-2">
        <div className="rounded-lg border-l-4 border-[var(--color-warning)] bg-yellow-50 px-4 py-3 text-xs text-yellow-900">
          <strong>Provisional data:</strong> The most recent 3 months are
          subject to revision as additional reports are received. Dashed line
          segments indicate provisional values.
        </div>
        <div className="rounded-lg border-l-4 border-[var(--color-info)] bg-blue-50 px-4 py-3 text-xs text-blue-900">
          <strong>Suppression note:</strong> Values based on counts fewer than
          10 are suppressed to protect confidentiality.
        </div>
      </div>
    </div>
  );
}
