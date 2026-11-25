"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search, MessageSquare, LoaderCircle, CircleAlert, CornerDownRight } from "lucide-react";

type Source = { title: string; href: string };
type Turn =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; text: string; sources: Source[] }
  | { id: number; role: "error"; text: string };

export function AskAboutMyWork({
  suggestions,
  placeholder = "e.g. How did you build your RAG pipeline?",
}: {
  suggestions: string[];
  placeholder?: string;
}) {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const idRef = useRef(0);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    threadRef.current?.lastElementChild?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [turns]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || pending || cooldown > 0) return;
    setInput("");
    setTurns((t) => [...t, { id: ++idRef.current, role: "user", text: q }]);
    setPending(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json().catch(() => null);
      if (!data) throw new Error("bad");
      if (!data.ok) {
        if (data.retryAfter) setCooldown(Math.min(Number(data.retryAfter), 90));
        setTurns((t) => [...t, { id: ++idRef.current, role: "error", text: data.error }]);
      } else {
        setTurns((t) => [...t, { id: ++idRef.current, role: "assistant", text: data.answer, sources: data.sources }]);
      }
    } catch {
      setTurns((t) => [...t, { id: ++idRef.current, role: "error", text: "Couldn't reach the assistant. Check your connection and try again." }]);
    } finally {
      setPending(false);
    }
  }

  const disabled = pending || cooldown > 0;

  return (
    <section
      aria-labelledby="ask-heading"
      className="relative rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-5">
        <h2 id="ask-heading" className="text-[12px] font-semibold uppercase tracking-[0.1em] text-accent">
          Ask about my work
        </h2>
      </div>

      <form
        className="flex items-center gap-2 px-4 pb-4 pt-2.5 sm:px-5"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label className="relative flex-1">
          <span className="sr-only">Your question</span>
          <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={400}
            placeholder={placeholder}
            className="h-11 w-full bg-transparent pl-8 pr-2 text-[15px] text-ink placeholder:text-muted focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={disabled || input.trim().length < 3}
          className="inline-flex h-10 min-w-[4.5rem] items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-accent-ink transition-[opacity,transform] hover:opacity-90 active:translate-y-px disabled:opacity-45"
        >
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-label="Thinking" /> : cooldown > 0 ? `${cooldown}s` : "Ask"}
        </button>
      </form>

      {turns.length > 0 && (
        <div ref={threadRef} aria-live="polite" className="max-h-[26rem] space-y-4 overflow-y-auto border-t border-line px-4 py-5 sm:px-5">
          {turns.map((t) =>
            t.role === "user" ? (
              <p key={t.id} className="flex items-start gap-2 text-[14.5px] font-medium text-ink">
                <CornerDownRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
                {t.text}
              </p>
            ) : t.role === "error" ? (
              <p key={t.id} role="alert" className="flex items-start gap-2 rounded-lg bg-surface-2 px-3 py-2.5 text-[14px] text-ink-2">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
                {t.text}
              </p>
            ) : (
              <div key={t.id} className="pl-5.5">
                <p className="text-[14.5px] leading-relaxed text-ink-2">{t.text}</p>
                {t.sources.length > 0 && (
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted">
                    <span>Sources:</span>
                    {t.sources.map((s) => (
                      <Link key={s.href + s.title} href={s.href} className="text-accent underline-offset-2 hover:underline">
                        {s.title}
                      </Link>
                    ))}
                  </p>
                )}
              </div>
            ),
          )}
          {pending && (
            <p className="flex items-center gap-2 pl-5.5 text-[13.5px] text-muted">
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Looking through the portfolio
            </p>
          )}
        </div>
      )}

      <ul className="border-t border-line py-2">
        {suggestions.map((s) => (
          <li key={s}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => ask(s)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14.5px] text-ink transition-colors hover:bg-surface-2 disabled:opacity-60 sm:px-5"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent text-accent-ink" aria-hidden="true">
                <MessageSquare className="h-3.5 w-3.5" />
              </span>
              {s}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
