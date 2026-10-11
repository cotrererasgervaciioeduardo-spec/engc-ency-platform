import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-20 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan">Error 404</p>
        <h1 className="font-display mt-4 text-4xl text-mist">No encontramos esa página</h1>
        <p className="mt-4 text-sm leading-7 text-fog">
          El enlace puede estar desactualizado o la herramienta todavía no existe
          en el catálogo.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary rounded-full px-5 py-3 text-sm">
            Ir al inicio
          </Link>
          <Link href="/herramientas" className="btn-ghost rounded-full px-5 py-3 text-sm">
            Ver herramientas
          </Link>
        </div>
      </div>
    </main>
  );
}
