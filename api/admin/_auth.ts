/// <reference types="node" />
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "hodiy_admin_session";
export const SESSION_MAX_AGE = 8 * 60 * 60; // 8 soat

export type AdminUser = {
  id: string;
  email: string;
  role: "admin";
};

/** Faqat server tomonida mavjud bo'ladigan o'zgaruvchilar. */
export type ServerEnv = {
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
  NODE_ENV?: string;
  API_URL?: string;
  AUTH_API_URL?: string;
  VITE_API_URL?: string;
  VITE_AUTH_API_URL?: string;
  [key: string]: string | undefined;
};

function sha256(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/** Uzunligi farq qiladigan satrlarni ham xavfsiz solishtiradi. */
export function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(sha256(a), sha256(b));
}

export function getSecret(env: ServerEnv): string | null {
  const secret = env.SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

export function isConfigured(env: ServerEnv): boolean {
  return Boolean(env.ADMIN_EMAIL && env.ADMIN_PASSWORD && getSecret(env));
}

export function verifyCredentials(email: string, password: string, env: ServerEnv): boolean {
  if (!isConfigured(env)) return false;
  const emailOk = safeEqual(email.trim().toLowerCase(), env.ADMIN_EMAIL!.trim().toLowerCase());
  const passwordOk = safeEqual(password, env.ADMIN_PASSWORD!);
  // Ikkala tekshiruv ham bajarilishi shart (vaqt farqi bilan taxmin qilishning oldini olish).
  return emailOk && passwordOk;
}

export function createSession(user: AdminUser, env: ServerEnv): { token: string; maxAge: number } {
  const secret = getSecret(env);
  if (!secret) throw new Error("SESSION_SECRET 32 belgidan kam yoki sozlanmagan");

  const now = Math.floor(Date.now() / 1000);
  const payload = { ...user, iat: now, exp: now + SESSION_MAX_AGE };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(body).digest("base64url");
  return { token: `${body}.${signature}`, maxAge: SESSION_MAX_AGE };
}

/** Imzoni va muddatni tekshiradi; xato bo'lsa null qaytaradi. */
export function verifySession(token: string | undefined, env: ServerEnv): AdminUser | null {
  const secret = getSecret(env);
  if (!secret || !token) return null;

  const [body, signature, extra] = token.split(".");
  if (!body || !signature || extra) return null;

  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  if (!safeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as AdminUser & { exp?: number };
    if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    if (payload.role !== "admin" || !payload.email) return null;
    return { id: payload.id ?? "1", email: payload.email, role: "admin" };
  } catch {
    return null;
  }
}

function secureFlag(env: ServerEnv): string {
  return env.NODE_ENV === "production" ? "; Secure" : "";
}

export function sessionCookie(token: string, env: ServerEnv): string {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}${secureFlag(env)}`;
}

export function clearSessionCookie(env: ServerEnv): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureFlag(env)}`;
}

export function parseCookies(header: string | string[] | undefined): Record<string, string> {
  const raw = Array.isArray(header) ? header.join("; ") : header ?? "";
  const cookies: Record<string, string> = {};
  for (const part of raw.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    const key = part.slice(0, index).trim();
    if (!key) continue;
    try {
      cookies[key] = decodeURIComponent(part.slice(index + 1).trim());
    } catch {
      cookies[key] = part.slice(index + 1).trim();
    }
  }
  return cookies;
}

/** Backendga yuboriladigan Authorization qiymati — faqat serverda yig'iladi. */
export function backendAuthorization(env: ServerEnv): string {
  const email = env.ADMIN_EMAIL ?? "";
  const password = env.ADMIN_PASSWORD ?? "";
  return `Bearer ${Buffer.from(`${email}:${password}`).toString("base64")}`;
}
