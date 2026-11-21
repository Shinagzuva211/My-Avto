/// <reference types="node" />
import {
  SESSION_COOKIE,
  backendAuthorization,
  clearSessionCookie,
  createSession,
  isConfigured,
  parseCookies,
  sessionCookie,
  verifyCredentials,
  verifySession,
  type AdminUser,
  type ServerEnv,
} from "./_auth.js";

export type AdminRequest = {
  method: string;
  /** /api/admin ga nisbatan yo'l, masalan "/login" yoki "/proxy/cars" */
  path: string;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
  clientIp?: string;
};

export type AdminResponse = {
  status: number;
  headers: Record<string, string>;
  body: string;
};

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const UNAUTHORIZED: AdminResponse = {
  status: 401,
  headers: JSON_HEADERS,
  body: JSON.stringify({ error: "unauthorized" }),
};

// Oddiy, jarayon ichidagi login cheklovi (Vercel'da har bir instansiya uchun alohida).
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_LIMIT = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (loginAttempts.size > 5000) loginAttempts.clear();
  return entry.count > LOGIN_LIMIT;
}

function json(status: number, value: unknown): AdminResponse {
  return { status, headers: JSON_HEADERS, body: JSON.stringify(value) };
}

function headerValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

/** Faqat xavfsiz yo'l segmentlarini o'tkazamiz (SSRF va path traversal oldini olish). */
function normalizeSegments(path: string): string[] | null {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0 || segments.length > 12) return null;
  for (const segment of segments) {
    if (!/^[A-Za-z0-9._~:-]+$/.test(segment) || segment === ".." || segment === ".") return null;
  }
  return segments;
}

function upstreamBase(env: ServerEnv, kind: "api" | "auth"): string | null {
  if (kind === "auth") {
    return env.VITE_AUTH_API_URL || env.AUTH_API_URL || "https://authorization-8nex.onrender.com";
  }
  return env.VITE_API_URL || env.API_URL || (env.NODE_ENV === "production" ? null : "http://localhost:5000");
}

function buildUpstreamUrl(
  base: string,
  segments: string[],
  query: Record<string, string | string[] | undefined> | undefined
): string {
  const url = new URL(base.replace(/\/$/, ""));
  url.pathname = `${url.pathname.replace(/\/$/, "")}/${segments.map(encodeURIComponent).join("/")}`;
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (key === "path") continue; // catch-all parametri
      if (Array.isArray(value)) value.forEach((item) => url.searchParams.append(key, item));
      else if (value !== undefined) url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

function serializeBody(body: unknown): { body?: string; contentType?: string } {
  if (body === undefined || body === null) return {};
  if (typeof body === "string") {
    return { body, contentType: "text/plain; charset=utf-8" };
  }
  return { body: JSON.stringify(body), contentType: "application/json" };
}

async function handleProxy(
  req: AdminRequest,
  env: ServerEnv,
  kind: "api" | "auth",
  pathname: string
): Promise<AdminResponse> {
  const prefix = kind === "auth" ? "/auth-proxy/" : "/proxy/";
  if (!pathname.startsWith(prefix)) return json(404, { error: "not_found" });

  const segments = normalizeSegments(pathname.slice(prefix.length));
  const base = upstreamBase(env, kind);
  if (!segments || !base) return json(502, { error: "upstream_not_configured" });

  const contentType = headerValue(req.headers?.["content-type"]);
  const payload = serializeBody(req.body);
  const method = req.method.toUpperCase();
  const headers: Record<string, string> = {
    Authorization: backendAuthorization(env),
    Accept: "application/json",
  };
  if (contentType) headers["Content-Type"] = contentType;
  else if (payload.contentType) headers["Content-Type"] = payload.contentType;

  const upstreamUrl = buildUpstreamUrl(base, segments, req.query);

  try {
    const upstream = await fetch(upstreamUrl, {
      method,
      headers,
      body: method === "GET" || method === "HEAD" ? undefined : payload.body,
    });
    const text = await upstream.text();
    const responseHeaders: Record<string, string> = {
      "Content-Type": headerValue(upstream.headers.get("content-type") ?? undefined) || "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    };
    return { status: upstream.status, headers: responseHeaders, body: text };
  } catch (error) {
    return json(502, { error: "upstream_unavailable", detail: error instanceof Error ? error.message : "unknown" });
  }
}

export async function handleAdminRequest(req: AdminRequest, env: ServerEnv): Promise<AdminResponse> {
  const pathname = req.path.replace(/\/$/, "") || "/";
  const method = req.method.toUpperCase();

  if (pathname === "/login" && method === "POST") {
    if (!isConfigured(env)) return json(503, { error: "Admin autentifikatsiyasi serverda sozlanmagan" });

    const ip = req.clientIp || headerValue(req.headers?.["x-forwarded-for"]).split(",")[0].trim() || "unknown";
    if (isRateLimited(ip)) return json(429, { error: "Juda ko'p urinish. Biroz kuting." });

    const body = (req.body ?? {}) as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!verifyCredentials(email, password, env)) {
      return json(401, { error: "Email yoki parol noto'g'ri" });
    }

    const user: AdminUser = { id: "1", email: email.trim().toLowerCase(), role: "admin" };
    const { token } = createSession(user, env);
    return {
      status: 200,
      headers: { ...JSON_HEADERS, "Set-Cookie": sessionCookie(token, env) },
      body: JSON.stringify({ user }),
    };
  }

  if (pathname === "/logout" && method === "POST") {
    return {
      status: 200,
      headers: { ...JSON_HEADERS, "Set-Cookie": clearSessionCookie(env) },
      body: JSON.stringify({ ok: true }),
    };
  }

  if (pathname === "/me" && method === "GET") {
    const cookies = parseCookies(req.headers?.cookie);
    const user = verifySession(cookies[SESSION_COOKIE], env);
    if (!user) return UNAUTHORIZED;
    return json(200, { user });
  }

  if (pathname.startsWith("/proxy/") || pathname.startsWith("/auth-proxy/")) {
    const cookies = parseCookies(req.headers?.cookie);
    if (!verifySession(cookies[SESSION_COOKIE], env)) return UNAUTHORIZED;
    return handleProxy(req, env, pathname.startsWith("/auth-proxy/") ? "auth" : "api", pathname);
  }

  return json(404, { error: "not_found" });
}
