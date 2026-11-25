"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, FileText, Mail } from "lucide-react";
import { navItems, isActive } from "./nav-items";
import { ThemeToggle } from "./theme-toggle";
import { GitHubIcon, LinkedInIcon, XIcon } from "./icons";
import { Avatar } from "./avatar";
import { siteConfig } from "@/data/site.config";

function Connect({ onNavigate }: { onNavigate?: () => void }) {
  const links = [
    siteConfig.github && { href: siteConfig.github, label: "GitHub", Icon: GitHubIcon, ext: true },
    siteConfig.linkedin && { href: siteConfig.linkedin, label: "LinkedIn", Icon: LinkedInIcon, ext: true },
    siteConfig.x && { href: siteConfig.x, label: "X", Icon: XIcon, ext: true },
    siteConfig.resumeUrl && { href: siteConfig.resumeUrl, label: "Resume", Icon: FileText, ext: true },
    siteConfig.email && { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail, ext: false },
  ].filter(Boolean) as Array<{ href: string; label: string; Icon: React.ComponentType<{ className?: string }>; ext: boolean }>;
  return (
    <ul className="space-y-0.5">
      {links.map(({ href, label, Icon, ext }) => (
        <li key={label}>
          <a
            href={href}
            onClick={onNavigate}
            {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex h-8 items-center gap-3 rounded-lg px-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
            {ext && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

function NavList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="space-y-0.5">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex h-9 items-center gap-3 rounded-lg px-3 text-[14px] transition-colors ${
                active ? "bg-ink font-medium text-bg" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Identity() {
  return (
    <Link href="/" className="flex items-center gap-3 rounded-lg">
      <Avatar size={40} />
      <span className="min-w-0">
        <span className="block text-[15px] font-medium leading-tight text-ink">{siteConfig.name}</span>
        <span className="block truncate text-[12.5px] leading-tight text-muted">{siteConfig.role}</span>
      </span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-rail px-4 py-7 lg:flex">
        <div className="px-2">
          <Identity />
        </div>
        <nav aria-label="Primary" className="mt-8">
          <NavList pathname={pathname} />
        </nav>
        <div className="mt-8">
          <p className="mb-2 px-3 text-xs font-medium text-faint">Connect</p>
          <Connect />
        </div>
        <div className="mt-auto pt-6">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-bg/90 px-4 backdrop-blur-md lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <Avatar size={30} />
          <span className="text-[15px] font-medium">{siteConfig.name}</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-surface-2"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-bg px-4 pb-10 pt-4 lg:hidden"
      >
        <nav aria-label="Primary">
          <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
        </nav>
        <div className="mt-6 border-t border-line pt-5">
          <p className="mb-2 px-3 text-xs font-medium text-faint">Connect</p>
          <Connect onNavigate={() => setOpen(false)} />
        </div>
        <div className="mt-6 border-t border-line pt-4">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
