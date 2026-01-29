"use client";

import type { MockStateData } from "@/lib/constants/mockData";

interface Props {
  data: MockStateData[];
  maxItems?: number;
}

const COLORS = {
  rising: "var(--color-series-2)",
  stable: "var(--color-series-3)",
  declining: "var(--color-series-1)",
};

const TREND_LABELS = {
  rising: "▲",
  stable: "—",
  declining: "▼",
};

export function HorizontalBarChart({ data, maxItems = 10 }: Props) {
  const sorted = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, maxItems);
  const maxValue = Math.max(...sorted.map((d) => d.value));

  return (
    <div className="space-y-2">
      {sorted.map((d) => {
        const pct = (d.value / maxValue) * 100;
        return (
          <div key={d.abbr} className="flex items-center gap-3">
            <span className="w-8 text-right text-xs font-medium text-[var(--color-text-secondary)]">
              {d.abbr}
            </span>
            <div className="flex-1">
              <div className="h-6 w-full rounded bg-[var(--color-bg-tertiary)]">
                <div
                  className="flex h-6 items-center rounded pl-2 text-xs font-medium text-white"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: COLORS[d.trend],
                    transition: "width 0.5s ease",
                  }}
                >
                  {d.value.toFixed(1)}
                </div>
              </div>
            </div>
            <span
              className="w-8 text-center text-xs"
              style={{ color: COLORS[d.trend] }}
            >
              {TREND_LABELS[d.trend]}{" "}
              {d.change > 0 ? `+${d.change}` : d.change}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
