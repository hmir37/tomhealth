"use client";

import { useState } from "react";

interface Props {
  datasetSlug: string;
}

export function MetadataDrawer({ datasetSlug }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-[var(--color-brand)] hover:underline"
        aria-label={`About the ${datasetSlug} dataset`}
      >
        ⓘ About this data
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/30"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Dataset metadata"
        >
          <aside
            className="w-96 overflow-y-auto bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">About this data</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Metadata, methodology, update cadence, suppression rules, and
              citation information for <strong>{datasetSlug}</strong> will be
              fetched from the CDC API metadata endpoint.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}
