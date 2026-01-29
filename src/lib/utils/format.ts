import { timeFormat } from "d3-time-format";

export const formatDate = timeFormat("%b %d, %Y");
export const formatDateShort = timeFormat("%b %Y");

export function formatNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toLocaleString("en-US");
}

export function formatRate(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)} per 100K`;
}
