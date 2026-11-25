import "server-only";
import * as si from "simple-icons";

type SimpleIcon = { title: string; hex: string; path: string };

/** A real brand mark from simple-icons, in its own colour. Falls back to a monogram tile. */
export function BrandIcon({ name, icon, className = "" }: { name: string; icon?: string; className?: string }) {
  const found = icon ? ((si as unknown as Record<string, SimpleIcon>)[icon] ?? null) : null;
  if (!found) {
    const letters = name
      .replace(/[^A-Za-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <span
        aria-hidden="true"
        className={`grid place-items-center rounded-md bg-surface-2 font-mono text-[11px] font-medium text-muted ${className}`}
      >
        {letters}
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={`grid place-items-center rounded-md bg-white ring-1 ring-line ${className}`}>
      <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" style={{ fill: `#${found.hex}` }}>
        <path d={found.path} />
      </svg>
    </span>
  );
}
