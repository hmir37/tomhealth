/**
 * Web Worker for client-side data aggregation.
 *
 * Offloads rolling averages, percentile calculations, and other
 * statistical computations to a background thread so the main thread
 * stays responsive during interactive filtering.
 *
 * Usage: const worker = new Worker(new URL('./aggregate.worker.ts', import.meta.url));
 *        worker.postMessage({ type: 'rollingAverage', data, windowSize });
 */

self.onmessage = (event: MessageEvent) => {
  const { type, data, windowSize } = event.data;

  switch (type) {
    case "rollingAverage": {
      const result = computeRollingAverage(data, windowSize ?? 7);
      self.postMessage({ type: "rollingAverage", result });
      break;
    }
    default:
      self.postMessage({ type: "error", message: `Unknown type: ${type}` });
  }
};

function computeRollingAverage(
  values: number[],
  windowSize: number
): (number | null)[] {
  return values.map((_, i) => {
    if (i < windowSize - 1) return null;
    const window = values.slice(i - windowSize + 1, i + 1);
    return window.reduce((sum, v) => sum + v, 0) / windowSize;
  });
}
