import { ComparisonWorkspace } from "@/components/layout/ComparisonWorkspace";

export default function ComparePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <a href="/" className="text-[var(--color-brand)] hover:underline">
          Catalog
        </a>
        <span className="text-[var(--color-text-muted)]">/</span>
        <span className="text-[var(--color-text-secondary)]">Compare</span>
      </div>

      <h1 className="text-2xl font-bold">Compare Regions</h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-text-secondary)]">
        Select up to 5 jurisdictions to compare trends side by side. Click a
        region button to add or remove it from the comparison.
      </p>
      <ComparisonWorkspace />
    </div>
  );
}
