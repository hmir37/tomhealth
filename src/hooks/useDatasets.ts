"use client";

import { useQuery } from "@tanstack/react-query";
import { DATASET_REGISTRY } from "@/lib/constants/datasets";
import type { DatasetSummary } from "@/lib/api/types";

/**
 * Returns the curated dataset catalog.
 * Currently backed by the static registry; will switch to an API call
 * once a catalog endpoint is available.
 */
export function useDatasets() {
  return useQuery<DatasetSummary[]>({
    queryKey: ["datasets"],
    queryFn: async () => DATASET_REGISTRY,
    staleTime: Infinity,
  });
}
