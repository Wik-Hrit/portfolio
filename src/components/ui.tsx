import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site.config";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-200 active:translate-y-px";
const variants: Record<Variant, string> = {
  primary: "bg-ink text-bg hover:bg-ink-2",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink/40 shadow-[0_1px_0_rgba(0,0,0,0.03)]",
  ghost: "text-ink-2 hover:bg-surface-2 hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const isExternal = external ?? /^(https?:|mailto:)/.test(href);
  const cls = `${base} ${variants[variant]} ${className}`;
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {newTab && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link inline-flex items-center gap-1 text-sm text-ink-2 transition-colors hover:text-accent ${className}`}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function Chip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "accent" | "ok" }) {
  const tones = {
    neutral: "border-line bg-surface text-ink-2",
    accent: "border-transparent bg-accent-soft text-accent",
    ok: "border-transparent bg-[color-mix(in_srgb,var(--ok)_12%,transparent)] text-ok",
  };
  return (
    <span className={`inline-flex h-6 items-center rounded-md border px-2 text-[12px] leading-none ${tones[tone]}`}>{children}</span>
  );
}

/** Section heading: a real h2 with an optional one-line lede and a right-side link. */
export function SectionHeading({
  id,
  title,
  lede,
  href,
  hrefLabel,
}: {
  id?: string;
  title: string;
  lede?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6">
      <div>
        <h2 id={id} className="text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">
          {title}
        </h2>
        {lede && <p className="mt-1.5 text-[15px] text-muted">{lede}</p>}
      </div>
      {href && hrefLabel && (
        <Link href={href} className="shrink-0 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline">
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}

export function PageHeader({ title, lede, children }: { title: string; lede?: string; children?: React.ReactNode }) {
  return (
    <header className="mb-12">
      <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[2.75rem]">{title}</h1>
      {lede && <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-muted">{lede}</p>}
      {children}
    </header>
  );
}

export function StatusBadge() {
  if (!siteConfig.availability.enabled) return null;
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1 pl-2.5 pr-3.5 text-[13px] text-ink-2">
      <span className="status-dot h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
      {siteConfig.availability.label}
    </p>
  );
}

export function Container({ children, wide = false, className = "" }: { children: React.ReactNode; wide?: boolean; className?: string }) {
  return <div className={`mx-auto w-full px-5 sm:px-8 ${wide ? "max-w-[68rem]" : "max-w-[46rem]"} ${className}`}>{children}</div>;
}
