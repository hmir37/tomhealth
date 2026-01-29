"use client";

import { FilterPanel } from "@/components/filters/FilterPanel";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { MetadataDrawer } from "@/components/data-display/MetadataDrawer";

interface Props {
  datasetSlug: string;
}

export function ExplorerWorkspace({ datasetSlug }: Props) {
  return (
    <div className="flex gap-6">
      {/* Left sidebar: filters */}
      <aside className="w-64 shrink-0">
        <FilterPanel datasetSlug={datasetSlug} />
      </aside>

      {/* Center: primary visualization */}
      <section className="min-w-0 flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Dataset: {datasetSlug}
          </h1>
          <MetadataDrawer datasetSlug={datasetSlug} />
        </div>
        <ChartContainer datasetSlug={datasetSlug} />
      </section>
    </div>
  );
}
