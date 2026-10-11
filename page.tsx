import Image from "next/image";
import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { getFeaturedTools } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = (await getFeaturedTools()).slice(0, 8);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Composición abstracta de paneles holográficos y un nodo geométrico sobre un fondo azul marino."
            fill
            priority
            className="object-cover opacity-55"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/30 via-[#05070d]/55 to-[#05070d]" />
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
          <div className="rise">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan">
              Laboratorio de herramientas digitales
            </p>
            <h1 className="font-display mt-5 max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.05] text-mist">
              Tu espacio para explorar la inteligencia artificial.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-fog sm:text-lg">
              Descubre herramientas digitales diseñadas para ayudarte a crear,
              aprender, escribir y trabajar de forma más inteligente.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/herramientas" className="btn-primary rounded-full px-6 py-3">
                Explorar herramientas
              </Link>
              <Link href="/acerca" className="btn-ghost rounded-full px-6 py-3">
                Conocer la plataforma
              </Link>
            </div>
            <p className="mt-6 max-w-lg text-sm text-fog">
              Primera etapa: catálogo, búsqueda y fichas reales. El asistente se
              muestra como demostración visual, todavía sin conexión a modelos.
            </p>
          </div>
          <aside className="card-surface rise relative overflow-hidden rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan">Nodo ENCY</p>
            <h2 className="font-display mt-3 text-3xl text-mist">Una plataforma, muchas utilidades.</h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-fog">
              <li>Catálogo con estados honestos de disponibilidad.</li>
              <li>Interfaz de conversación preparada, no conectada.</li>
              <li>Arquitectura de servidor lista para la etapa 2.</li>
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl border border-white/8 bg-black/20 px-3 py-4">
                <p className="font-display text-2xl text-mist">{featured.length}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-fog">Destacadas</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 px-3 py-4">
                <p className="font-display text-2xl text-mist">Etapa 1</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-fog">Publicada</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan">Selección inicial</p>
            <h2 className="font-display mt-2 text-3xl text-mist sm:text-4xl">Herramientas destacadas</h2>
          </div>
          <Link href="/herramientas" className="text-sm text-cyan hover:underline">
            Ver catálogo completo
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} actionLabel="Explorar" />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3">
        {[
          {
            title: "Explora",
            body: "Filtra el catálogo por escritura, estudio, programación, creatividad o productividad.",
          },
          {
            title: "Revisa el estado",
            body: "Cada ficha indica si es una vista previa o si todavía está en camino. Nada se presenta como IA conectada.",
          },
          {
            title: "Deja tu interés",
            body: "Si una herramienta te resulta útil, puedes apuntarte para un aviso cuando esté disponible.",
          },
        ].map((item) => (
          <article key={item.title} className="card-surface rounded-3xl p-6">
            <h3 className="font-display text-2xl text-mist">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-fog">{item.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
