export type ContactInput = { name: string; email: string; subject: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const limits = {
  name: [2, 80],
  subject: [3, 120],
  message: [20, 4000],
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the form (instant feedback) and the API route (the real check). */
export function validateContact(input: Partial<Record<keyof ContactInput, unknown>>): {
  data: ContactInput;
  errors: ContactErrors;
} {
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data = { name: s(input.name), email: s(input.email), subject: s(input.subject), message: s(input.message) };
  const errors: ContactErrors = {};
  if (data.name.length < limits.name[0]) errors.name = "Enter your name.";
  else if (data.name.length > limits.name[1]) errors.name = `Keep your name under ${limits.name[1]} characters.`;
  if (!EMAIL.test(data.email)) errors.email = "Enter an email address I can reply to, like name@example.com.";
  if (data.subject.length < limits.subject[0]) errors.subject = "Add a short subject.";
  else if (data.subject.length > limits.subject[1]) errors.subject = `Keep the subject under ${limits.subject[1]} characters.`;
  if (data.message.length < limits.message[0]) errors.message = `Write at least ${limits.message[0]} characters so I know what it's about.`;
  else if (data.message.length > limits.message[1]) errors.message = `Keep the message under ${limits.message[1]} characters.`;
  return { data, errors };
}
