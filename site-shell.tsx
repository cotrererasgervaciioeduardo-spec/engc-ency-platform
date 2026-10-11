import type { ReactNode } from "react";
import { ChatWidget } from "@/components/chat-widget";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="noise" aria-hidden="true" />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-navy"
      >
        Saltar al contenido
      </a>
      <Header />
      <div id="contenido">{children}</div>
      <Footer />
      <ChatWidget />
    </div>
  );
}
