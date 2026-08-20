import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";

const tools = [
  {
    href: "/tools/password",
    title: "Password",
    description: "Password sicure e personalizzabili, generate localmente.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    href: "/tools/qrcode",
    title: "QR Code",
    description: "Trasforma testo o link in un codice QR scaricabile.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M14 14h3v3h-3zM19 14h2v2h-2zM14 19h2v2h-2zM19 19h2v2h-2z" />
      </svg>
    ),
  },
  {
    href: "/tools/uuid",
    title: "UUID",
    description: "Identificatori univoci v4, generati in un click.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    href: "/tools/hash",
    title: "Hash",
    description: "Calcola SHA-1, SHA-256, SHA-384 o SHA-512 di un testo.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4l4 16M16 4l-4 16M6 9h14M4 15h14" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Genera ciò che ti serve.
          <br />
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            Resta sul tuo dispositivo.
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Quattro strumenti per chi lavora con codice e credenziali. Ogni
          calcolo avviene nel browser: funziona anche offline, e niente di
          ciò che generi viene inviato altrove.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </section>

      <AdBanner className="mt-12" />
    </div>
  );
}
