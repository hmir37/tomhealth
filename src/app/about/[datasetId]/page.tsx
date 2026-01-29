interface Props {
  params: Promise<{ datasetId: string }>;
}

export default async function AboutDatasetPage({ params }: Props) {
  const { datasetId } = await params;
  return (
    <div className="prose max-w-none">
      <h1>About This Dataset</h1>
      <p className="text-[var(--color-text-secondary)]">
        Dataset ID: <code>{datasetId}</code>
      </p>
      <section>
        <h2>Methodology</h2>
        <p>Methodology details will be loaded from the CDC API metadata endpoint.</p>
      </section>
      <section>
        <h2>Update Frequency</h2>
        <p>Placeholder for update cadence information.</p>
      </section>
      <section>
        <h2>Known Limitations</h2>
        <p>Placeholder for suppression rules, data quality notes, and caveats.</p>
      </section>
      <section>
        <h2>Citation</h2>
        <p>Placeholder for recommended citation format.</p>
      </section>
    </div>
  );
}
