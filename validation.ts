const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length < 5 || email.length > 160) return null;
  if (!EMAIL_PATTERN.test(email)) return null;
  return email;
}

export function normalizeMessage(value: unknown, maxLength = 4000): string | null {
  if (typeof value !== "string") return null;
  const message = value.trim();
  if (message.length === 0 || message.length > maxLength) return null;
  return message;
}

export function normalizeConversationId(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string") return null;
  const id = value.trim();
  const uuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuid.test(id)) return null;
  return id;
}

export function normalizeSlug(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const slug = value.trim().toLowerCase();
  if (!/^[a-z0-9-]{2,80}$/.test(slug)) return null;
  return slug;
}
