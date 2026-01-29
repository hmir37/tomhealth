import { DATASET_REGISTRY } from "@/lib/constants/datasets";

interface Props {
  params: Promise<{ datasetId: string }>;
}

export default async function AboutDatasetPage({ params }: Props) {
  const { datasetId } = await params;
  const dataset =
    DATASET_REGISTRY.find((d) => d.id === datasetId || d.slug === datasetId) ||
    null;
  const title = dataset?.title || datasetId;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <a href="/" className="text-[var(--color-brand)] hover:underline">
          Catalog
        </a>
        <span className="text-[var(--color-text-muted)]">/</span>
        <span className="text-[var(--color-text-secondary)]">About</span>
        <span className="text-[var(--color-text-muted)]">/</span>
        <span className="text-[var(--color-text-secondary)]">{datasetId}</span>
      </div>

      <h1 className="text-3xl font-bold">{title}</h1>
      {dataset && (
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {dataset.description}
        </p>
      )}

      {/* Quick metadata bar */}
      <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-[var(--color-bg-secondary)] p-5">
        <MetaItem label="Category" value={dataset?.category || "—"} />
        <MetaItem label="Update Frequency" value={dataset?.updateFrequency || "—"} />
        <MetaItem label="API Endpoint" value={dataset?.apiEndpoint || "—"} mono />
      </div>

      {/* Content sections */}
      <div className="mt-8 space-y-8">
        <Section title="Methodology">
          <p>
            This dataset is compiled from reports submitted by healthcare
            facilities and state health departments to the CDC. Data undergoes
            automated quality checks and manual review before publication.
          </p>
          <p>
            Rates are calculated using U.S. Census Bureau population estimates
            as denominators. Age-adjusted rates use the 2000 U.S. standard
            population.
          </p>
        </Section>

        <Section title="Data Collection">
          <ul className="list-disc space-y-1 pl-5">
            <li>Reporting jurisdictions include all 50 states, DC, and U.S. territories</li>
            <li>Data is collected via the National Notifiable Diseases Surveillance System (NNDSS)</li>
            <li>Electronic laboratory reporting (ELR) supplements case-based surveillance</li>
            <li>Historical data may be revised as additional reports are received</li>
          </ul>
        </Section>

        <Section title="Suppression Rules">
          <div className="rounded-lg border-l-4 border-[var(--color-warning)] bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
            <strong>Privacy protection:</strong> Cell values based on counts
            fewer than 10 are suppressed to protect patient confidentiality.
            Suppressed values appear as &quot;—&quot; in data tables and are excluded from
            visualizations. Complementary suppression may also be applied to
            prevent back-calculation.
          </div>
        </Section>

        <Section title="Known Limitations">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Reporting lag:</strong> Recent data (most recent 3 months)
              is provisional and subject to revision
            </li>
            <li>
              <strong>Underreporting:</strong> Not all cases are captured by
              surveillance; actual counts may be higher
            </li>
            <li>
              <strong>Geographic granularity:</strong> County-level data may be
              unavailable for low-population areas due to suppression
            </li>
            <li>
              <strong>Demographic completeness:</strong> Race/ethnicity data may
              be missing for a significant proportion of records
            </li>
          </ul>
        </Section>

        <Section title="Update Schedule">
          <p>
            This dataset is updated <strong>{dataset?.updateFrequency?.toLowerCase() || "periodically"}</strong>.
            The most recent data point reflects reports received through the
            previous reporting period. Historical data may be revised at any
            update.
          </p>
        </Section>

        <Section title="Recommended Citation">
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-4 font-mono text-sm">
            Centers for Disease Control and Prevention. {title}.
            CDC Open Data. Available at: https://data.cdc.gov/resource/
            {dataset?.apiEndpoint || datasetId}. Accessed [date].
          </div>
        </Section>

        <Section title="API Access">
          <p>
            This dataset is available via the CDC SODA API for programmatic
            access:
          </p>
          <div className="mt-2 rounded-lg bg-[var(--color-brand-dark)] p-4 font-mono text-sm text-green-300">
            GET https://data.cdc.gov/resource/{dataset?.apiEndpoint || datasetId}.json
          </div>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Supports $where, $select, $group, $order, $limit, and $offset
            query parameters for filtering and aggregation.
          </p>
        </Section>
      </div>

      {/* Back to explorer */}
      {dataset && (
        <div className="mt-10 border-t border-[var(--color-border)] pt-6">
          <a
            href={`/explore/${dataset.slug}`}
            className="inline-block rounded-lg bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:shadow-lg"
          >
            Open in Explorer
          </a>
        </div>
      )}
    </div>
  );
}

function MetaItem({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-[var(--color-text-muted)]">
        {label}
      </p>
      <p
        className={`mt-0.5 text-sm font-semibold ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-[var(--color-text-primary)]">
        {title}
      </h2>
      <div className="space-y-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {children}
      </div>
    </section>
  );
}
