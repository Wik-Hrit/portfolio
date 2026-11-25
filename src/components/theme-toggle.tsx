"use client";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const order = ["system", "light", "dark"] as const;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = (mounted ? theme : "system") as (typeof order)[number];
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon = current === "dark" ? Moon : current === "light" ? Sun : Monitor;
  const label = current === "system" ? "System theme" : current === "dark" ? "Dark theme" : "Light theme";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`${label}. Switch to ${next} theme`}
      title={`${label}. Click for ${next}.`}
      className={`inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink ${className}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="lg:inline">{mounted ? label.replace(" theme", "") : "Theme"}</span>
    </button>
  );
}
