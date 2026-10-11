export function StatusBadge({ status }: { status: string }) {
  if (status === "preview") {
    return (
      <span className="status-preview inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]">
        Vista previa
      </span>
    );
  }

  return (
    <span className="status-soon inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]">
      Próximamente
    </span>
  );
}
