"use client";

import { useQueryState, parseAsString, parseAsArrayOf } from "nuqs";

/**
 * Typed URL state hooks for the explorer workspace.
 * Every filter selection is reflected in the URL for shareability.
 */
export function useTimeRange() {
  const [start, setStart] = useQueryState("start", parseAsString);
  const [end, setEnd] = useQueryState("end", parseAsString);
  return { start, end, setStart, setEnd };
}

export function useGeoFilter() {
  const [regions, setRegions] = useQueryState(
    "regions",
    parseAsArrayOf(parseAsString, ",")
  );
  return { regions, setRegions };
}

export function useIndicatorFilter() {
  const [indicator, setIndicator] = useQueryState("indicator", parseAsString);
  return { indicator, setIndicator };
}
