export const assistantConfigured = () => Boolean(process.env.GROQ_API_KEY);
export const contactConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
