"use client";

import { useEffect, useId, useRef, useState } from "react";

type ChatItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME: ChatItem = {
  id: "welcome",
  role: "assistant",
  content:
    "¡Hola! Esta es la interfaz del asistente ENGC ENCY. Escribe una pregunta para comenzar.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ChatItem[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState<boolean | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const titleId = useId();

  useEffect(() => {
    let active = true;
    fetch("/api/chat", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { configured?: boolean }) => {
        if (active) setConnected(data.configured === true);
      })
      .catch(() => {
        if (active) setConnected(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const node = listRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [items, pending, open]);

  function resetConversation() {
    setItems([WELCOME]);
    setError("");
    setInput("");
  }

  async function sendMessage(event?: React.FormEvent) {
    event?.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const userItem: ChatItem = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setItems((current) => [...current, userItem]);
    setInput("");
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          messages: [
            ...items
              .filter((item) => item.id !== WELCOME.id)
              .slice(-10)
              .map(({ role, content }) => ({ role, content })),
            { role: "user", content: text },
          ],
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        connected?: boolean;
        demo?: boolean;
        message?: { content?: string };
      };

      if (!response.ok) {
        setError(data.error ?? "No se pudo enviar el mensaje de demostración.");
        return;
      }

      if (typeof data.connected === "boolean") {
        setConnected(data.connected);
      }

      setItems((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            data.message?.content ??
            "No se recibió una respuesta válida del asistente.",
        },
      ]);
    } catch {
      setError("No se pudo contactar con el servidor. Inténtalo de nuevo.");
    } finally {
      setPending(false);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 sm:p-6">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {open ? (
          <section
            className="flex h-[min(34rem,78vh)] w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220]/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <header className="flex items-start justify-between gap-3 border-b border-white/8 bg-[url('/images/chat-backdrop.jpg')] bg-cover bg-center px-4 py-3">
              <div className="rounded-2xl bg-[#070b14]/80 p-3">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cyan">
                  {connected === true ? "IA configurada" : connected === false ? "Modo demostración" : "Comprobando configuración"}
                </p>
                <h2 id={titleId} className="font-display text-lg text-mist">
                  Asistente ENGC ENCY
                </h2>
                <p className="text-xs text-fog">
                  {connected === true
                    ? "La clave está configurada en el servidor"
                    : connected === false
                      ? "Sin conexión a modelos"
                      : "Verificando el estado"}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-mist"
                  onClick={resetConversation}
                >
                  Nueva
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-mist"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </header>
            <div
              ref={listRef}
              className="chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    item.role === "user"
                      ? "ml-auto bg-cyan/15 text-mist"
                      : "bg-white/5 text-fog"
                  }`}
                >
                  <p className="mb-1 text-[0.65rem] uppercase tracking-[0.16em] text-cyan/80">
                    {item.role === "user" ? "Tú" : "Asistente · ENGC ENCY"}
                  </p>
                  <p className="whitespace-pre-wrap">{item.content}</p>
                </div>
              ))}
              {pending ? (
                <p className="text-xs text-cyan" role="status">
                  {connected === true ? "La IA está pensando…" : "Comprobando el modo de demostración…"}
                </p>
              ) : null}
              {error ? (
                <p className="rounded-2xl border border-amber-200/20 bg-amber-200/8 px-3 py-2 text-sm text-amber-100" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
            <form onSubmit={sendMessage} className="border-t border-white/8 p-3">
              <label className="sr-only" htmlFor="chat-input">
                Escribe un mensaje de demostración
              </label>
              <div className="flex items-end gap-2">
                <textarea
                  id="chat-input"
                  ref={inputRef}
                  rows={2}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onKeyDown}
                  maxLength={4000}
                  placeholder={connected === true ? "Escribe tu pregunta…" : "Escribe para probar la interfaz…"}
                  className="min-h-[3rem] flex-1 resize-none rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-mist placeholder:text-fog/70"
                />
                <button
                  type="submit"
                  className="btn-primary rounded-2xl px-4 py-3 text-sm disabled:opacity-50"
                  disabled={pending || input.trim().length === 0}
                >
                  Enviar
                </button>
              </div>
              <p className="mt-2 px-1 text-[0.65rem] leading-4 text-fog/80">
                {connected === true
                  ? "Los mensajes se envían a OpenRouter para generar respuestas. Esta aplicación no guarda el historial del chat en su base de datos."
                  : "El asistente está en modo demostración y no genera respuestas de IA."}
              </p>
            </form>
          </section>
        ) : null}
        <button
          type="button"
          className="glow-ring grid h-14 w-14 place-items-center rounded-full bg-[#0d1a24] text-cyan"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">
            {open ? "Cerrar asistente ENGC ENCY" : "Abrir asistente ENGC ENCY"}
          </span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <>
                <path d="M5 12c0-4 3.2-7 7-7s7 3 7 7-3.2 7-7 7H8l-3 2v-4.2C5.3 15.4 5 13.8 5 12Z" />
                <path d="M9 12h.01M12 12h.01M15 12h.01" />
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
