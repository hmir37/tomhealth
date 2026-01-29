"use client";

import { useState, useMemo } from "react";
import type { MockTimeSeriesPoint } from "@/lib/constants/mockData";

interface Props {
  data: MockTimeSeriesPoint[];
}

type SortKey = "date" | "value" | "lowerCI" | "upperCI";
type SortDir = "asc" | "desc";

export function DataTable({ data }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(0);
  const perPage = 15;

  const sorted = useMemo(() => {
    const copy = [...data];
    copy.sort((a, b) => {
      const av = sortKey === "date" ? a.date : a[sortKey];
      const bv = sortKey === "date" ? b.date : b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / perPage);
  const pageData = sorted.slice(page * perPage, (page + 1) * perPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return " \u2195";
    return sortDir === "asc" ? " \u2191" : " \u2193";
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
              <th
                className="cursor-pointer px-3 py-2 hover:text-[var(--color-text-primary)]"
                onClick={() => toggleSort("date")}
              >
                Date{sortIcon("date")}
              </th>
              <th
                className="cursor-pointer px-3 py-2 text-right hover:text-[var(--color-text-primary)]"
                onClick={() => toggleSort("value")}
              >
                Value{sortIcon("value")}
              </th>
              <th
                className="cursor-pointer px-3 py-2 text-right hover:text-[var(--color-text-primary)]"
                onClick={() => toggleSort("lowerCI")}
              >
                Lower CI{sortIcon("lowerCI")}
              </th>
              <th
                className="cursor-pointer px-3 py-2 text-right hover:text-[var(--color-text-primary)]"
                onClick={() => toggleSort("upperCI")}
              >
                Upper CI{sortIcon("upperCI")}
              </th>
              <th className="px-3 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr
                key={row.date}
                className={`border-b border-[var(--color-bg-tertiary)] ${
                  i % 2 === 0 ? "bg-white" : "bg-[var(--color-bg-secondary)]"
                } ${row.provisional ? "opacity-70" : ""}`}
              >
                <td className="px-3 py-2 font-mono text-xs">{row.date}</td>
                <td className="px-3 py-2 text-right font-medium">
                  {row.value.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right text-[var(--color-text-muted)]">
                  {row.lowerCI.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right text-[var(--color-text-muted)]">
                  {row.upperCI.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-center">
                  {row.provisional ? (
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                      Provisional
                    </span>
                  ) : (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Final
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <span>
          Showing {page * perPage + 1}–
          {Math.min((page + 1) * perPage, sorted.length)} of {sorted.length}{" "}
          records
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="rounded border border-[var(--color-border)] px-3 py-1 disabled:opacity-30"
          >
            Previous
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="rounded border border-[var(--color-border)] px-3 py-1 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
