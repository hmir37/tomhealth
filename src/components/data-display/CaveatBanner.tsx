interface Props {
  message: string;
  type?: "warning" | "info";
}

export function CaveatBanner({ message, type = "info" }: Props) {
  const styles =
    type === "warning"
      ? "border-[var(--color-warning)] bg-yellow-50 text-yellow-900"
      : "border-[var(--color-info)] bg-blue-50 text-blue-900";

  return (
    <div
      className={`rounded border-l-4 px-4 py-3 text-sm ${styles}`}
      role="status"
    >
      {message}
    </div>
  );
}
