import Link from "next/link";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="ency-mark" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7CF0E4" />
          <stop offset="1" stopColor="#8B6CFF" />
        </linearGradient>
      </defs>
      <path
        d="M24 4.5 42.5 15.2v17.6L24 43.5 5.5 32.8V15.2L24 4.5Z"
        stroke="url(#ency-mark)"
        strokeWidth="1.7"
      />
      <path
        d="M24 12.2v7.4M24 28.4v7.4M14.2 17.8l6.1 3.5M27.7 26.7l6.1 3.5M33.8 17.8l-6.1 3.5M20.3 26.7l-6.1 3.5"
        stroke="url(#ency-mark)"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="3.4" fill="url(#ency-mark)" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 rounded-full focus-visible:outline-offset-4"
      aria-label="ENGC ENCY, ir al inicio"
    >
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 rounded-2xl bg-cyan/20 blur-md opacity-0 transition group-hover:opacity-100" />
        <LogoMark className="relative h-9 w-9" />
      </span>
      <span className="leading-none">
        <span className="font-display block text-[1.05rem] font-semibold tracking-[0.18em] text-mist">
          ENGC
        </span>
        <span className="font-display block text-[0.72rem] font-medium tracking-[0.42em] text-cyan">
          ENCY
        </span>
      </span>
      {compact ? null : (
        <span className="hidden text-[0.68rem] uppercase tracking-[0.22em] text-fog/80 sm:inline">
          Laboratorio digital
        </span>
      )}
    </Link>
  );
}
