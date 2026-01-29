# tomhealth — Front-End Technical & Product Plan

A public-facing data exploration and visualization platform for the CDC Open Data and Public API ecosystem.

---

## 1. Core User Goals

### Problems to solve better than current CDC tools

- **Discoverability**: CDC datasets are siloed across multiple portals. tomhealth provides a single, searchable entry point with meaningful categorization (disease area, geography, time range, population).
- **Interactivity**: Existing tools are largely static tables or pre-rendered charts. tomhealth enables real-time filtering, cross-filtering, brushing, and drill-down without page reloads.
- **Context & interpretation**: Raw numbers without methodology notes mislead. tomhealth surfaces data caveats, suppression rules, confidence intervals, and "what this means" guidance inline—not buried in footnotes.
- **Comparison**: Side-by-side comparison of regions, time periods, or demographic cohorts is currently painful. tomhealth makes it a first-class workflow.
- **Shareability**: Every view state is URL-encoded so researchers, journalists, and policymakers can link directly to a specific filtered, annotated visualization.

### Primary user workflows

1. **Explore trends** — Select a condition or indicator, view time-series nationally, drill into states/counties.
2. **Compare regions** — Pick 2–5 jurisdictions, overlay their trends, see a ranked table.
3. **Filter by demographics** — Slice by age, race/ethnicity, sex; see stratified views and equity gaps.
4. **Investigate an outbreak or event** — Time-scrub to a window, see geographic spread, link to related datasets.
5. **Export & share** — Download filtered data (CSV/JSON), export chart as PNG/SVG, copy a shareable URL.

---

## 2. Front-End Architecture

### Framework: Next.js (App Router)

- **SSR/SSG** for SEO and fast first paint—important for a public-sector site that must be indexable and quick on slow connections.
- **React Server Components** reduce client JS for static content (methodology pages, dataset catalogs).
- **File-based routing** maps cleanly to `/explore/[dataset]`, `/compare`, `/about/[dataset-id]`.
- **API route handlers** provide a thin proxy layer for CDC APIs (rate-limit buffering, caching headers) without a separate backend service.
- **TypeScript** throughout—non-negotiable for a data-heavy app where shape mismatches cause silent errors.

### State management

- **URL as primary state**: All filter selections, active dataset, time range, and comparison targets are serialized into query parameters via `nuqs` or a lightweight URL-state library. This gives free shareability and back-button support.
- **React Query (TanStack Query)** for all server data: caching, deduplication, background refetch, stale-while-revalidate. CDC API responses are cached aggressively (most surveillance data updates weekly at most).
- **Local UI state via React context or Zustand** only for transient concerns: open/closed panels, tooltip position, active brush selection. Keep this layer thin.
- **No Redux.** The combination of URL state + React Query + a small Zustand store covers every need with less boilerplate.

### Keeping the UI responsive

- **Debounced filter changes** (200–300 ms) before firing API requests.
- **Web Workers** for any client-side aggregation or statistical computation (percentiles, rolling averages) to keep the main thread free.
- **Optimistic UI**: Show skeleton/loading states immediately; swap in data when ready. Never block the entire page on a single slow request.
- **Streaming rendering** via React Suspense boundaries—shell loads instantly, data-dependent panels stream in.

---

## 3. UI / UX Design System

### Layout paradigm: Exploratory workspace with guided entry points

- **Home / Catalog page**: Card grid of featured datasets and topic areas (Infectious Disease, Chronic Conditions, Environmental Health, etc.). Search bar with autocomplete. Not a dashboard—users choose what to explore.
- **Explorer page** (`/explore/[dataset]`): Left sidebar for filters, center stage for the primary visualization, right drawer (collapsible) for metadata/interpretation. This is the core workspace.
- **Compare page** (`/compare`): Split-panel or overlay mode for multi-region or multi-indicator comparison.
- **Dataset detail page** (`/about/[dataset-id]`): Methodology, update cadence, known limitations, API endpoint documentation. Linked from every visualization.

### Reusable component library

| Component | Purpose |
|---|---|
| `FilterPanel` | Renders dynamic filter controls (dropdowns, multi-selects, date pickers) from dataset metadata |
| `TimeRangeSlider` | Brush-style range selector for time-series data |
| `ChartContainer` | Wrapper handling loading states, error states, empty states, and chart-type switching |
| `GeoMap` | Choropleth / bubble map with zoom, pan, tooltip |
| `DataTable` | Virtualized sortable table with inline sparklines |
| `ComparisonStrip` | Small-multiples or overlay chart for side-by-side jurisdictions |
| `CaveatBanner` | Inline callout for suppression rules, missing data, provisional status |
| `MetadataDrawer` | Slide-out panel with dataset description, methodology, update schedule |
| `ExportMenu` | Download CSV/JSON, copy URL, export chart image |
| `Legend` | Shared legend component with color-blind-safe swatches and keyboard interaction |

### Accessibility (WCAG 2.1 AA minimum)

- **Color**: Use a palette derived from ColorBrewer / Carto color schemes that are color-blind-safe. Never encode meaning with color alone—pair with pattern, shape, or label.
- **Keyboard**: All interactive elements (filters, chart drill-downs, map regions) are keyboard-navigable. Focus management on panel open/close.
- **Screen readers**: Charts include `aria-label` summaries (e.g., "Line chart showing COVID-19 hospitalizations in Texas, January 2023 to December 2025, trending downward"). Data tables serve as the accessible fallback for every chart.
- **Motion**: Respect `prefers-reduced-motion`. Disable chart transitions when set.
- **Text**: Minimum 16px body, high contrast ratios (≥4.5:1 for text, ≥3:1 for UI elements).

---

## 4. Data Visualization Strategy

### Visualization types

| Data shape | Chart type | Library |
|---|---|---|
| Time series (single indicator) | Line chart with confidence band | D3 via a React wrapper (e.g., visx) |
| Time series (multi-region) | Small multiples or overlaid lines with legend | visx |
| Geographic | Choropleth map, bubble map | deck.gl or Mapbox GL JS with GeoJSON |
| Demographic breakdown | Grouped bar chart, stacked bar | visx |
| Distribution | Histogram, box plot | visx |
| Ranked comparison | Horizontal bar chart, slope chart | visx |
| Correlation | Scatterplot with trendline | visx |

**Why visx over Recharts/Chart.js**: CDC data demands precise visual encoding. visx (D3 primitives as React components) offers full control over axes, annotations, and custom marks without fighting an opinionated chart library. The tradeoff is more code per chart, but the result is scientifically credible visualizations.

### Interaction patterns

- **Hover**: Tooltip showing exact value, date, confidence interval, and data source.
- **Brush**: Click-drag on time axis to select a sub-range; all linked views update.
- **Drill-down**: Click a state on the map → filter the time series to that state. Click a bar segment → show sub-demographic breakdown.
- **Cross-filtering**: Linked views share filter context. Selecting a time range in chart A filters chart B and the map simultaneously.
- **Annotations**: User (or system) can pin vertical reference lines for policy events (e.g., "Vaccine authorized") on time-series charts.

### Communicating uncertainty and caveats

- **Confidence intervals**: Shaded bands on line charts, error bars on bar charts. Always visible by default; toggle to hide.
- **Missing data**: Dashed line segments for interpolated gaps. Missing cells in tables show "—" with tooltip explaining why (suppressed, not reported, not applicable).
- **Suppression**: When cell counts are below the suppression threshold, display "Suppressed (n < X)" with a link to the suppression methodology.
- **Provisional data**: A distinct visual style (e.g., lighter opacity, dotted line) for the most recent data points that are subject to revision, plus a `CaveatBanner` explaining the provisional window.
- **Methodology link**: Every chart has a small "ⓘ About this data" button that opens the `MetadataDrawer`.

---

## 5. Interactive Analytical Tools

### Dynamic multi-dimensional filters

- The `FilterPanel` is generated from dataset metadata (available dimensions, valid values, dependencies between dimensions).
- Filters are additive (AND). Each active filter shows as a removable chip above the visualization. "Clear all" resets to defaults.
- Dependent filters: selecting a state narrows the county dropdown; selecting a disease narrows available indicators.
- A "filter summary" line (e.g., "Showing: Influenza hospitalizations, Ages 65+, Texas, 2022–2025") is always visible below the chart title.

### Region and population comparisons

- **Add to comparison** button on any region or demographic slice. Up to 5 items can be compared simultaneously.
- Comparison view offers toggle between overlay (single chart, multiple lines) and small multiples (one chart per item, shared axis).
- A ranked summary table appears below with key statistics (peak value, trend direction, per-capita rate).

### Time-range scrubbing and trend highlighting

- The `TimeRangeSlider` sits below the main chart. Handles are draggable; the selected window is highlighted.
- A "play" button animates through time (useful for geographic spread animations on the map).
- Trend detection: optionally overlay a smoothed trendline (7-day or 4-week moving average) with a toggle. Display the computed slope as "Rising," "Stable," or "Declining" with a small arrow icon.

### Contextual guidance

- **"About this data"** drawer: dataset description, source agency, update frequency, suppression rules, known limitations, citation format.
- **"How to interpret"** tooltips on specific chart elements (e.g., on a confidence band: "This shaded area represents the 95% confidence interval").
- **Glossary popover**: Technical terms (incidence, prevalence, age-adjusted rate) are underlined with a dotted line; hover/click shows a plain-language definition.

---

## 6. Performance & Scalability (UI Layer)

### Lazy loading and code splitting

- Each visualization type (map, line chart, bar chart) is a dynamically imported module (`next/dynamic`). The explore page only loads the chart type being displayed.
- The `MetadataDrawer` and `ExportMenu` are lazy-loaded on interaction.
- Route-based code splitting is automatic with Next.js App Router.

### Virtualization

- `DataTable` uses `@tanstack/react-virtual` for row virtualization. Tables with 50k+ rows render smoothly.
- The dataset catalog page virtualizes the card grid if the catalog grows large.

### Pagination and incremental loading

- API responses are paginated. The UI fetches the first page immediately and prefetches the next page in the background.
- For time-series data, fetch the requested time window only. If the user expands the range via the slider, fetch the delta.

### Client-side vs. server-side aggregation

- **Default: server-side aggregation.** The CDC SODA APIs support `$group`, `$where`, and `$select` for server-side filtering and aggregation. Always push filtering and grouping to the API to minimize data transfer.
- **Client-side aggregation only for**: small datasets already fully loaded (< 10k rows), or interactive computations that the API doesn't support (custom rolling windows, percentile calculations). Run these in a Web Worker.
- **Heuristic**: If the filtered dataset exceeds ~50k rows, require server-side aggregation. Show a message if the user's filter selection would return too much data.

---

## 7. Developer Experience

### Folder organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home / catalog
│   ├── explore/
│   │   └── [dataset]/
│   │       └── page.tsx    # Explorer workspace
│   ├── compare/
│   │   └── page.tsx        # Comparison view
│   └── about/
│       └── [datasetId]/
│           └── page.tsx    # Dataset methodology
├── components/
│   ├── charts/             # ChartContainer, LineChart, BarChart, GeoMap, etc.
│   ├── filters/            # FilterPanel, TimeRangeSlider, FilterChip
│   ├── layout/             # Header, Sidebar, Drawer, Footer
│   ├── data-display/       # DataTable, StatCard, CaveatBanner
│   └── ui/                 # Buttons, inputs, modals, tooltips (design system primitives)
├── hooks/                  # useDataset, useFilters, useUrlState, useMediaQuery
├── lib/
│   ├── api/                # CDC API client functions, type definitions
│   ├── constants/          # Color palettes, breakpoints, dataset registry
│   └── utils/              # Formatting (dates, numbers), statistics helpers
├── workers/                # Web Worker scripts for client-side computation
└── styles/                 # Global styles, CSS custom properties, tokens
```

### Styling approach

- **Tailwind CSS** for utility-first styling with a custom theme (`tailwind.config.ts`) encoding the design tokens (CDC-appropriate color palette, spacing scale, typography).
- **CSS custom properties** for theming values that charts and non-Tailwind contexts need (e.g., D3/visx inline styles reading `--color-primary-series`).
- **No CSS-in-JS runtime.** Tailwind + CSS variables keeps the styling zero-runtime and cacheable.

### Testing strategy

| Layer | Tool | What to test |
|---|---|---|
| Unit | Vitest | Utility functions (formatting, statistics), data transformation logic, filter serialization/deserialization |
| Component | Vitest + React Testing Library | Filter interactions, loading/error/empty states, accessibility (axe-core integration) |
| Visual regression | Playwright + screenshot comparison | Chart rendering correctness across browsers, responsive layout breakpoints |
| E2E | Playwright | Full user workflows: select dataset → apply filters → verify chart updates → export data |
| Data integrity | Vitest | Snapshot tests verifying that API response parsing produces expected typed structures; guards against API schema drift |

### Additional DX considerations

- **Storybook** for isolated component development and design review. Each component in `components/` has a `.stories.tsx` file.
- **Strict TypeScript**: `strict: true`, no `any`. CDC API response types are generated from OpenAPI specs or manually maintained as a single source of truth in `lib/api/types.ts`.
- **ESLint + Prettier** with a11y plugin (`eslint-plugin-jsx-a11y`).
- **CI**: Lint → Type check → Unit tests → Build → Playwright E2E. All must pass before merge.

---

## Summary of Key Technology Choices

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js (App Router) | SSR, SEO, streaming, file routing |
| Language | TypeScript (strict) | Data integrity, refactoring safety |
| Server data | TanStack Query | Caching, deduplication, background refetch |
| URL state | nuqs | Shareable, bookmarkable filter state |
| Local UI state | Zustand | Lightweight, no boilerplate |
| Charts | visx (D3 + React) | Full control, scientific accuracy |
| Maps | Mapbox GL JS or deck.gl | Performant geo rendering |
| Tables | TanStack Table + react-virtual | Virtualized, sortable, accessible |
| Styling | Tailwind CSS + CSS custom properties | Zero-runtime, themeable |
| Testing | Vitest + Playwright | Fast unit tests, reliable E2E |
| Component dev | Storybook | Isolated development, visual review |

---

This plan is designed to be implemented incrementally. A reasonable first milestone would be: catalog page + one dataset explorer (time-series line chart with filter panel and metadata drawer) + compare mode for 2 jurisdictions. That vertical slice validates the architecture and provides immediate user value.
