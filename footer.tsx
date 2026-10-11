import Link from "next/link";
import { Logo } from "@/components/logo";

const footerLinks = [
  { href: "/", label: "Inicio" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/explorar", label: "Explorar" },
  { href: "/acerca", label: "Acerca de" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/8 bg-black/20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-fog">
            ENGC ENCY reúne herramientas digitales e inteligencia artificial en
            un mismo espacio. Esta primera versión publica el catálogo y deja
            preparada la arquitectura para una conexión posterior.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-fog">Navegar</p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-sm text-mist/90 hover:text-cyan" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-fog">Estado</p>
          <p className="mt-4 text-sm leading-6 text-fog">
            Chatbot: demostración visual, sin conexión a modelos.
            <br />
            OpenRouter: pendiente de la etapa 2.
          </p>
        </div>
      </div>
      <div className="border-t border-white/8">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-fog sm:px-6">
          ENGC ENCY · Proyecto tecnológico en construcción · No recopilamos datos
          personales salvo el correo que decidas enviar para avisar de una
          herramienta.
        </p>
      </div>
    </footer>
  );
}
