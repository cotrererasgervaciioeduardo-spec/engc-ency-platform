import Link from "next/link";
import { ToolIcon } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import type { ToolWithCategory } from "@/lib/catalog";

export function ToolCard({
  tool,
  actionLabel = "Abrir ficha",
}: {
  tool: ToolWithCategory;
  actionLabel?: string;
}) {
  return (
    <article className="card-surface group flex h-full flex-col rounded-3xl p-5 transition duration-300">
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan/20 bg-cyan/8 text-cyan">
          <ToolIcon name={tool.icon} />
        </span>
        <StatusBadge status={tool.status} />
      </div>
      <h3 className="font-display mt-5 text-xl text-mist">{tool.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-fog">{tool.shortDescription}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-fog">
          {tool.categoryName}
        </span>
        <Link
          href={`/herramientas/${tool.slug}`}
          className="btn-ghost rounded-full px-4 py-2 text-sm"
        >
          {actionLabel}
        </Link>
      </div>
    </article>
  );
}
