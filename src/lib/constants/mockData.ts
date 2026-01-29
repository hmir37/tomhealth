/**
 * Mock data for development.
 * Simulates CDC API responses so the UI is fully viewable before backend integration.
 */

export interface MockTimeSeriesPoint {
  date: string;
  value: number;
  lowerCI: number;
  upperCI: number;
  provisional?: boolean;
}

export interface MockStateData {
  state: string;
  abbr: string;
  value: number;
  trend: "rising" | "stable" | "declining";
  change: number;
}

// Generate a realistic COVID-like time series
function generateTimeSeries(
  startYear: number,
  months: number,
  baseValue: number,
  volatility: number,
  peakMonths: number[] = []
): MockTimeSeriesPoint[] {
  const points: MockTimeSeriesPoint[] = [];
  let current = baseValue;
  for (let i = 0; i < months; i++) {
    const month = (i % 12) + 1;
    const year = startYear + Math.floor(i / 12);
    const isPeak = peakMonths.includes(month);
    const seasonalFactor = isPeak ? 1.8 + Math.random() * 0.6 : 1;
    current =
      current * (0.9 + Math.random() * 0.2) * seasonalFactor +
      (Math.random() - 0.5) * volatility;
    current = Math.max(current, baseValue * 0.1);
    const value = Math.round(current);
    const ci = Math.round(value * 0.12);
    const dateStr = `${year}-${String(month).padStart(2, "0")}-01`;
    points.push({
      date: dateStr,
      value,
      lowerCI: value - ci,
      upperCI: value + ci,
      provisional: i >= months - 3,
    });
  }
  return points;
}

export const MOCK_COVID_SERIES = generateTimeSeries(2020, 60, 5000, 800, [1, 2, 12]);
export const MOCK_FLU_SERIES = generateTimeSeries(2019, 72, 2200, 400, [11, 12, 1, 2]);
export const MOCK_VACCINATION_SERIES = generateTimeSeries(2018, 84, 65, 5, []);

export const MOCK_COMPARISON_SERIES: Record<string, MockTimeSeriesPoint[]> = {
  California: generateTimeSeries(2022, 36, 6200, 900, [1, 2, 12]),
  Texas: generateTimeSeries(2022, 36, 5100, 700, [1, 7, 8, 12]),
  "New York": generateTimeSeries(2022, 36, 4800, 600, [1, 2, 12]),
  Florida: generateTimeSeries(2022, 36, 4500, 800, [7, 8, 9]),
  Illinois: generateTimeSeries(2022, 36, 3100, 500, [1, 2, 12]),
};

export const MOCK_STATE_DATA: MockStateData[] = [
  { state: "California", abbr: "CA", value: 142.3, trend: "declining", change: -8.2 },
  { state: "Texas", abbr: "TX", value: 178.9, trend: "rising", change: 12.4 },
  { state: "Florida", abbr: "FL", value: 165.1, trend: "rising", change: 5.7 },
  { state: "New York", abbr: "NY", value: 128.7, trend: "declining", change: -11.3 },
  { state: "Pennsylvania", abbr: "PA", value: 134.2, trend: "stable", change: 0.8 },
  { state: "Illinois", abbr: "IL", value: 151.6, trend: "declining", change: -3.9 },
  { state: "Ohio", abbr: "OH", value: 168.4, trend: "rising", change: 7.1 },
  { state: "Georgia", abbr: "GA", value: 172.8, trend: "rising", change: 9.3 },
  { state: "Michigan", abbr: "MI", value: 145.9, trend: "stable", change: -1.2 },
  { state: "North Carolina", abbr: "NC", value: 159.3, trend: "rising", change: 4.6 },
  { state: "New Jersey", abbr: "NJ", value: 131.5, trend: "declining", change: -6.8 },
  { state: "Virginia", abbr: "VA", value: 138.7, trend: "stable", change: 1.4 },
  { state: "Washington", abbr: "WA", value: 112.4, trend: "declining", change: -9.7 },
  { state: "Arizona", abbr: "AZ", value: 183.2, trend: "rising", change: 14.1 },
  { state: "Massachusetts", abbr: "MA", value: 119.8, trend: "declining", change: -5.4 },
  { state: "Tennessee", abbr: "TN", value: 176.5, trend: "rising", change: 8.8 },
  { state: "Indiana", abbr: "IN", value: 162.1, trend: "stable", change: 2.3 },
  { state: "Missouri", abbr: "MO", value: 158.7, trend: "stable", change: -0.5 },
  { state: "Maryland", abbr: "MD", value: 141.3, trend: "declining", change: -4.1 },
  { state: "Colorado", abbr: "CO", value: 125.6, trend: "declining", change: -7.3 },
];

export const DATASET_MOCK_MAP: Record<string, MockTimeSeriesPoint[]> = {
  "covid-hospitalizations": MOCK_COVID_SERIES,
  "flu-surveillance": MOCK_FLU_SERIES,
  "chronic-disease-indicators": generateTimeSeries(2015, 120, 340, 30, []),
  "vaccination-coverage": MOCK_VACCINATION_SERIES,
  "environmental-health": generateTimeSeries(2016, 108, 78, 10, [6, 7, 8]),
  "mortality-underlying-cause": generateTimeSeries(2014, 132, 820, 40, [1, 12]),
};
