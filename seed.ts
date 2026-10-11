import { catalogCategories, catalogTools } from "@/data/catalog";
import { db } from "@/db";
import { categories, tools } from "@/db/schema";

let seedPromise: Promise<void> | null = null;

async function seedCatalog() {
  const existing = await db.select({ id: tools.id }).from(tools).limit(1);
  if (existing.length > 0) return;

  await db.insert(categories).values(catalogCategories);
  await db.insert(tools).values(catalogTools);
}

export async function ensureCatalogSeeded() {
  if (!seedPromise) {
    seedPromise = seedCatalog().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}
