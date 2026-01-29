/**
 * Core types for CDC API responses.
 * These will be refined as we integrate specific datasets.
 */

export interface DatasetSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  updateFrequency: string;
  apiEndpoint: string;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  lowerCI?: number;
  upperCI?: number;
  provisional?: boolean;
  suppressed?: boolean;
}

export interface GeoDataPoint {
  fips: string;
  name: string;
  value: number;
  lowerCI?: number;
  upperCI?: number;
}

export interface FilterDimension {
  key: string;
  label: string;
  type: "select" | "multi-select" | "date-range";
  options?: { value: string; label: string }[];
  dependsOn?: string;
}

export interface DatasetMetadata {
  id: string;
  title: string;
  description: string;
  methodology: string;
  updateFrequency: string;
  suppressionRules: string;
  knownLimitations: string;
  citation: string;
  dimensions: FilterDimension[];
}
