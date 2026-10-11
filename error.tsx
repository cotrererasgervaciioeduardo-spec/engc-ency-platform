"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto grid min-h-[50vh] max-w-xl place-items-center px-4 py-20 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan">Algo no ha ido bien</p>
        <h1 className="font-display mt-4 text-3xl text-mist">No se pudo cargar esta vista</h1>
        <p className="mt-4 text-sm leading-7 text-fog">
          Ha ocurrido un error inesperado. Puedes reintentar o volver al catálogo.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-primary mt-8 rounded-full px-5 py-3 text-sm"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}
