"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/tool-card";
import type { Category } from "@/db/schema";
import type { ToolWithCategory } from "@/lib/catalog";

type SortKey = "featured" | "name" | "status";

export function ToolsCatalog({
  tools,
  categories,
  initialQuery = "",
  initialCategory = "todas",
}: {
  tools: ToolWithCategory[];
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
}) {
  const knownCategory = categories.some((item) => item.slug === initialCategory)
    ? initialCategory
    : "todas";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(knownCategory);
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = tools.filter((tool) => {
      const matchesCategory = category === "todas" || tool.categorySlug === category;
      const matchesQuery =
        needle.length === 0 ||
        tool.name.toLowerCase().includes(needle) ||
        tool.shortDescription.toLowerCase().includes(needle) ||
        tool.categoryName.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });

    next.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "es");
      if (sort === "status") return a.status.localeCompare(b.status) || a.sortOrder - b.sortOrder;
      return a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "es");
    });

    return next;
  }, [tools, query, category, sort]);

  return (
    <section>
      <div className="card-surface rounded-3xl p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_0.8fr]">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-fog">
              Buscar
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nombre, descripción o categoría"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-mist placeholder:text-fog/70"
              type="search"
              autoComplete="off"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-fog">
              Categoría
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-mist"
            >
              <option value="todas">Todas</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-fog">
              Orden
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-mist"
            >
              <option value="featured">Destacadas</option>
              <option value="name">Nombre</option>
              <option value="status">Disponibilidad</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card-surface mt-8 rounded-3xl px-6 py-16 text-center">
          <p className="font-display text-2xl text-mist">Sin coincidencias</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-fog">
            No hay herramientas que coincidan con esa búsqueda. Prueba con otra
            palabra o restablece los filtros.
          </p>
          <button
            type="button"
            className="btn-ghost mt-6 rounded-full px-5 py-2 text-sm"
            onClick={() => {
              setQuery("");
              setCategory("todas");
              setSort("featured");
            }}
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </section>
  );
}
