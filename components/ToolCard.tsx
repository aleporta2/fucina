import Link from "next/link";

export default function ToolCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="neu-surface group flex flex-col gap-4 p-6 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98] active:shadow-neu-pressed"
    >
      <span className="btn-icon !h-12 !w-12 bg-brand-gradient text-white shadow-none">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
    </Link>
  );
}
