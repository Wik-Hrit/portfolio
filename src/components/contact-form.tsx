"use client";
import { useRef, useState } from "react";
import { Send, LoaderCircle, Check, Mail } from "lucide-react";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/contact-validation";

type State = "idle" | "sending" | "sent" | "error";

const fields: Array<{ name: keyof ContactInput; label: string; type?: string; autoComplete?: string; multiline?: boolean }> = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject" },
  { name: "message", label: "Message", multiline: true },
];

export function ContactForm({ configured, email }: { configured: boolean; email: string }) {
  const [values, setValues] = useState<ContactInput>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);

  function mailtoHref(v: ContactInput) {
    const body = `${v.message}\n\n${v.name}`;
    return `mailto:${email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data, errors: errs } = validateContact(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    if (!configured) {
      window.location.href = mailtoHref(data);
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setState("sent");
        setValues({ name: "", email: "", subject: "", message: "" });
        return;
      }
      if (json.errors) setErrors(json.errors);
      setMessage(json.error === "not_configured" ? "Form delivery isn't set up yet." : json.error || "Something went wrong.");
      setState("error");
    } catch {
      setMessage("Couldn't send. Check your connection.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-xl border border-line bg-surface p-6">
        <p className="flex items-center gap-2 font-medium text-ink">
          <Check className="h-4 w-4 text-ok" aria-hidden="true" /> Message sent.
        </p>
        <p className="mt-1 text-[14.5px] text-muted">Thanks for writing. I reply from {email}, usually within a couple of days.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-4 text-sm font-medium text-accent hover:underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      {!configured && (
        <p className="mb-5 rounded-lg bg-surface-2 px-3.5 py-2.5 text-[13.5px] text-ink-2">
          Messages open in your email app, already filled in, addressed to {email}.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `contact-${f.name}`;
          const err = errors[f.name];
          const common = {
            id,
            name: f.name,
            value: values[f.name],
            autoComplete: f.autoComplete,
            "aria-invalid": Boolean(err),
            "aria-describedby": err ? `${id}-error` : undefined,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setValues((v) => ({ ...v, [f.name]: e.target.value }));
              if (err) setErrors((x) => ({ ...x, [f.name]: undefined }));
            },
            className: `w-full rounded-lg border bg-bg px-3 text-[15px] text-ink placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent/25 ${
              err ? "border-danger" : "border-line-strong focus:border-accent"
            }`,
          };
          return (
            <div key={f.name} className={f.multiline || f.name === "subject" ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-medium text-ink">
                {f.label}
              </label>
              {f.multiline ? (
                <textarea {...common} rows={6} className={`${common.className} resize-y py-2.5`} />
              ) : (
                <input {...common} type={f.type ?? "text"} className={`${common.className} h-11`} />
              )}
              {err && (
                <p id={`${id}-error`} className="mt-1.5 text-[13px] text-danger">
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state === "error" && (
        <p role="alert" className="mt-4 text-[14px] text-ink-2">
          {message}{" "}
          <a href={mailtoHref(values)} className="font-medium text-accent hover:underline">
            Send it from your email app instead
          </a>
          .
        </p>
      )}

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-[12.5px] text-muted">All fields are required.</p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-medium text-bg transition-[background-color,transform] hover:bg-ink-2 active:translate-y-px disabled:opacity-60"
        >
          {state === "sending" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending
            </>
          ) : configured ? (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Send message
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" aria-hidden="true" /> Open in email app
            </>
          )}
        </button>
      </div>
    </form>
  );
}
