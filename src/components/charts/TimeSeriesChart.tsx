"use client";

import { useMemo } from "react";
import type { MockTimeSeriesPoint } from "@/lib/constants/mockData";

interface Props {
  data: MockTimeSeriesPoint[];
  width?: number;
  height?: number;
  showCI?: boolean;
  color?: string;
  title?: string;
}

const PADDING = { top: 30, right: 20, bottom: 50, left: 60 };

export function TimeSeriesChart({
  data,
  width = 800,
  height = 380,
  showCI = true,
  color = "var(--color-series-1)",
  title,
}: Props) {
  const chartW = width - PADDING.left - PADDING.right;
  const chartH = height - PADDING.top - PADDING.bottom;

  const { xScale, yScale, linePath, ciPath, provisionalStart } =
    useMemo(() => {
      const values = data.map((d) => d.value);
      const uppers = data.map((d) => d.upperCI);
      const yMin = Math.min(...data.map((d) => d.lowerCI)) * 0.9;
      const yMax = Math.max(...uppers) * 1.05;

      const xScale = (i: number) => (i / (data.length - 1)) * chartW;
      const yScale = (v: number) =>
        chartH - ((v - yMin) / (yMax - yMin)) * chartH;

      const linePath = data
        .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.value)}`)
        .join(" ");

      // Confidence interval area
      const upper = data
        .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(d.upperCI)}`)
        .join(" ");
      const lower = [...data]
        .reverse()
        .map((d, i) => {
          const origIdx = data.length - 1 - i;
          return `L${xScale(origIdx)},${yScale(d.lowerCI)}`;
        })
        .join(" ");
      const ciPath = upper + lower + "Z";

      const provisionalStart = data.findIndex((d) => d.provisional);

      return {
        xScale,
        yScale: (v: number) =>
          chartH - ((v - yMin) / (yMax - yMin)) * chartH,
        yMin,
        yMax,
        linePath,
        ciPath,
        provisionalStart,
      };
    }, [data, chartW, chartH]);

  // Generate Y-axis ticks
  const values = data.map((d) => d.value);
  const yMin = Math.min(...data.map((d) => d.lowerCI)) * 0.9;
  const yMax = Math.max(...data.map((d) => d.upperCI)) * 1.05;
  const yTicks = Array.from({ length: 6 }, (_, i) =>
    Math.round(yMin + (i / 5) * (yMax - yMin))
  );

  // Generate X-axis labels (show every 6th month)
  const xLabels = data
    .map((d, i) => ({ label: d.date.slice(0, 7), i }))
    .filter((_, i) => i % 6 === 0);

  return (
    <div className="w-full">
      {title && (
        <h3 className="mb-2 text-sm font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label={title || "Time series chart"}
      >
        <g transform={`translate(${PADDING.left},${PADDING.top})`}>
          {/* Grid lines */}
          {yTicks.map((tick) => (
            <line
              key={tick}
              x1={0}
              x2={chartW}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke="var(--color-bg-tertiary)"
              strokeWidth={1}
            />
          ))}

          {/* Confidence interval band */}
          {showCI && (
            <path
              d={ciPath}
              fill="var(--color-confidence-band)"
              stroke="none"
            />
          )}

          {/* Main line */}
          <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} />

          {/* Provisional indicator (dashed overlay) */}
          {provisionalStart >= 0 && (
            <>
              <path
                d={data
                  .slice(provisionalStart)
                  .map((d, i) => {
                    const idx = provisionalStart + i;
                    return `${i === 0 ? "M" : "L"}${xScale(idx)},${yScale(d.value)}`;
                  })
                  .join(" ")}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeDasharray="6 4"
                opacity={0.6}
              />
              <text
                x={xScale(provisionalStart)}
                y={-10}
                fontSize={10}
                fill="var(--color-text-muted)"
              >
                Provisional →
              </text>
            </>
          )}

          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.value)}
              r={data.length < 40 ? 3 : 1.5}
              fill={d.provisional ? "var(--color-provisional)" : color}
              stroke="white"
              strokeWidth={data.length < 40 ? 1.5 : 0}
            />
          ))}

          {/* Y-axis */}
          <line x1={0} x2={0} y1={0} y2={chartH} stroke="var(--color-border)" />
          {yTicks.map((tick) => (
            <text
              key={tick}
              x={-10}
              y={yScale(tick) + 4}
              textAnchor="end"
              fontSize={11}
              fill="var(--color-text-muted)"
            >
              {tick.toLocaleString()}
            </text>
          ))}

          {/* X-axis */}
          <line
            x1={0}
            x2={chartW}
            y1={chartH}
            y2={chartH}
            stroke="var(--color-border)"
          />
          {xLabels.map(({ label, i }) => (
            <text
              key={i}
              x={xScale(i)}
              y={chartH + 20}
              textAnchor="middle"
              fontSize={10}
              fill="var(--color-text-muted)"
            >
              {label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
