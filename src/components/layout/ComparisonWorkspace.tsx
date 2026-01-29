"use client";

import { useState, useMemo } from "react";
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart";
import { MOCK_COMPARISON_SERIES } from "@/lib/constants/mockData";
import { CHART_SERIES_COLORS } from "@/lib/constants/colors";

const ALL_REGIONS = Object.keys(MOCK_COMPARISON_SERIES);

export function ComparisonWorkspace() {
  const [selected, setSelected] = useState<string[]>([
    "California",
    "Texas",
    "New York",
  ]);

  const toggle = (region: string) => {
    setSelected((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : prev.length < 5
          ? [...prev, region]
          : prev
    );
  };

  // Summary stats per region
  const summaries = useMemo(
    () =>
      selected.map((region) => {
        const series = MOCK_COMPARISON_SERIES[region];
        const values = series.map((d) => d.value);
        const peak = Math.max(...values);
        const latest = values[values.length - 1];
        const prev = values[values.length - 4]; // ~3 months ago
        const changePct = prev ? (((latest - prev) / prev) * 100).toFixed(1) : "N/A";
        const trend = latest > prev * 1.03 ? "Rising" : latest < prev * 0.97 ? "Declining" : "Stable";
        return { region, peak, latest, changePct, trend };
      }),
    [selected]
  );

  return (
    <div className="space-y-6">
      {/* Region selector */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
          Select Regions (up to 5)
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_REGIONS.map((region) => {
            const isSelected = selected.includes(region);
            const idx = selected.indexOf(region);
            return (
              <button
                key={region}
                onClick={() => toggle(region)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  isSelected
                    ? "border-transparent text-white shadow-sm"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                }`}
                style={
                  isSelected
                    ? { backgroundColor: CHART_SERIES_COLORS[idx % CHART_SERIES_COLORS.length] }
                    : undefined
                }
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overlay chart */}
      {selected.length > 0 && (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
          <h3 className="mb-2 text-sm font-semibold">
            Monthly Trend Comparison — {selected.join(", ")}
          </h3>
          <div className="relative">
            {/* Render each series overlaid via stacked SVGs */}
            {selected.map((region, idx) => (
              <div
                key={region}
                className={idx > 0 ? "absolute inset-0" : ""}
              >
                <TimeSeriesChart
                  data={MOCK_COMPARISON_SERIES[region]}
                  showCI={false}
                  color={CHART_SERIES_COLORS[idx % CHART_SERIES_COLORS.length]}
                />
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            {selected.map((region, idx) => (
              <div key={region} className="flex items-center gap-2 text-sm">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      CHART_SERIES_COLORS[idx % CHART_SERIES_COLORS.length],
                  }}
                />
                {region}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary table */}
      {summaries.length > 0 && (
        <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold">Comparison Summary</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                <th className="px-3 py-2">Region</th>
                <th className="px-3 py-2 text-right">Latest Value</th>
                <th className="px-3 py-2 text-right">Peak Value</th>
                <th className="px-3 py-2 text-right">3-Month Change</th>
                <th className="px-3 py-2 text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {summaries.map((s, idx) => (
                <tr
                  key={s.region}
                  className="border-b border-[var(--color-bg-tertiary)]"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            CHART_SERIES_COLORS[
                              idx % CHART_SERIES_COLORS.length
                            ],
                        }}
                      />
                      <span className="font-medium">{s.region}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right font-mono">
                    {s.latest.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 text-right font-mono">
                    {s.peak.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 text-right font-mono">
                    {s.changePct}%
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        s.trend === "Rising"
                          ? "bg-red-100 text-red-800"
                          : s.trend === "Declining"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {s.trend === "Rising"
                        ? "\u25B2"
                        : s.trend === "Declining"
                          ? "\u25BC"
                          : "\u2014"}{" "}
                      {s.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
