import { and, asc, eq, ilike, or } from "drizzle-orm";
import { db } from "@/db";
import { categories, tools, type Category, type Tool } from "@/db/schema";
import { ensureCatalogSeeded } from "@/db/seed";

export type ToolWithCategory = Tool & {
  categoryName: string;
};

export async function getCategories(): Promise<Category[]> {
  await ensureCatalogSeeded();
  return db.select().from(categories).orderBy(asc(categories.name));
}

export async function getTools(): Promise<ToolWithCategory[]> {
  await ensureCatalogSeeded();
  const rows = await db
    .select({
      id: tools.id,
      slug: tools.slug,
      name: tools.name,
      shortDescription: tools.shortDescription,
      longDescription: tools.longDescription,
      categorySlug: tools.categorySlug,
      status: tools.status,
      icon: tools.icon,
      featured: tools.featured,
      sortOrder: tools.sortOrder,
      createdAt: tools.createdAt,
      categoryName: categories.name,
    })
    .from(tools)
    .leftJoin(categories, eq(tools.categorySlug, categories.slug))
    .orderBy(asc(tools.sortOrder), asc(tools.name));

  return rows.map((row) => ({
    ...row,
    categoryName: row.categoryName ?? "General",
  }));
}

export async function getFeaturedTools(): Promise<ToolWithCategory[]> {
  const all = await getTools();
  return all.filter((tool) => tool.featured);
}

export async function getToolBySlug(slug: string): Promise<ToolWithCategory | null> {
  await ensureCatalogSeeded();
  const rows = await db
    .select({
      id: tools.id,
      slug: tools.slug,
      name: tools.name,
      shortDescription: tools.shortDescription,
      longDescription: tools.longDescription,
      categorySlug: tools.categorySlug,
      status: tools.status,
      icon: tools.icon,
      featured: tools.featured,
      sortOrder: tools.sortOrder,
      createdAt: tools.createdAt,
      categoryName: categories.name,
    })
    .from(tools)
    .leftJoin(categories, eq(tools.categorySlug, categories.slug))
    .where(eq(tools.slug, slug))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  return { ...row, categoryName: row.categoryName ?? "General" };
}

export async function getRelatedTools(
  slug: string,
  categorySlug: string,
  limit = 3,
): Promise<ToolWithCategory[]> {
  const all = await getTools();
  return all
    .filter((tool) => tool.slug !== slug && tool.categorySlug === categorySlug)
    .slice(0, limit);
}

export async function searchTools(query: string): Promise<ToolWithCategory[]> {
  await ensureCatalogSeeded();
  const term = `%${query.trim()}%`;
  const rows = await db
    .select({
      id: tools.id,
      slug: tools.slug,
      name: tools.name,
      shortDescription: tools.shortDescription,
      longDescription: tools.longDescription,
      categorySlug: tools.categorySlug,
      status: tools.status,
      icon: tools.icon,
      featured: tools.featured,
      sortOrder: tools.sortOrder,
      createdAt: tools.createdAt,
      categoryName: categories.name,
    })
    .from(tools)
    .leftJoin(categories, eq(tools.categorySlug, categories.slug))
    .where(
      or(
        ilike(tools.name, term),
        ilike(tools.shortDescription, term),
        and(ilike(categories.name, term)),
      ),
    )
    .orderBy(asc(tools.sortOrder));

  return rows.map((row) => ({
    ...row,
    categoryName: row.categoryName ?? "General",
  }));
}
