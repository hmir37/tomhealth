/**
 * Chart color palette — matches CSS custom properties.
 * Use these in visx / D3 code that can't read CSS vars easily.
 */
export const CHART_SERIES_COLORS = [
  "#1b9e77", // series-1
  "#d95f02", // series-2
  "#7570b3", // series-3
  "#e7298a", // series-4
  "#66a61e", // series-5
  "#e6ab02", // series-6
  "#a6761d", // series-7
] as const;

export const CONFIDENCE_BAND_COLOR = "rgba(0, 94, 162, 0.12)";
export const PROVISIONAL_COLOR = "rgba(0, 94, 162, 0.45)";
export const SUPPRESSED_COLOR = "#c9cdd3";
