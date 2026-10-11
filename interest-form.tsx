"use client";

import { useState } from "react";

export function InterestForm({ slug, name }: { slug: string; name: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/tools/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug }),
      });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "No se pudo guardar el interés.");
        return;
      }
      setStatus("success");
      setMessage(data.message ?? "Interés guardado.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("No se pudo contactar con el servidor. Inténtalo más tarde.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-surface rounded-3xl p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan">Aviso de disponibilidad</p>
      <h2 className="font-display mt-2 text-2xl text-mist">Quiero enterarme</h2>
      <p className="mt-2 text-sm leading-6 text-fog">
        Deja un correo si quieres que te avisemos cuando {name} esté lista. Solo
        usaremos esa dirección para este aviso.
      </p>
      <label className="mt-5 block">
        <span className="sr-only">Correo electrónico</span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@correo.com"
          autoComplete="email"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-mist placeholder:text-fog/70"
        />
      </label>
      <button
        type="submit"
        className="btn-primary mt-4 w-full rounded-full px-4 py-3 text-sm disabled:opacity-60"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Guardando…" : "Avisarme"}
      </button>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-amber-200" : "text-cyan"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
