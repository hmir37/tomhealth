import { ComparisonWorkspace } from "@/components/layout/ComparisonWorkspace";

export default function ComparePage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Compare Regions</h1>
      <p className="mb-6 text-[var(--color-text-secondary)]">
        Select up to 5 jurisdictions to compare trends side by side.
      </p>
      <ComparisonWorkspace />
    </div>
  );
}
