/**
 * CDC API client.
 *
 * Thin wrapper around fetch for calling CDC SODA / Open Data endpoints.
 * Will be expanded with specific dataset fetchers as we integrate each one.
 */

const CDC_BASE_URL = "https://data.cdc.gov/resource";

export async function fetchDataset<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T[]> {
  const url = new URL(`${CDC_BASE_URL}/${endpoint}.json`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`CDC API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
