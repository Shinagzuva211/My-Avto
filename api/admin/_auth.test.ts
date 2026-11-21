/// <reference types="node" />
import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  SESSION_COOKIE,
  createSession,
  parseCookies,
  verifyCredentials,
  verifySession,
  type ServerEnv,
} from "./_auth.js";
import { handleAdminRequest, type AdminRequest } from "./_handler.js";

const env: ServerEnv = {
  ADMIN_EMAIL: "Admin@HodiyAvto.uz",
  ADMIN_PASSWORD: "s3cret-password",
  SESSION_SECRET: "x".repeat(48),
  NODE_ENV: "test",
  VITE_API_URL: "http://localhost:5000",
};

function request(overrides: Partial<AdminRequest> = {}): AdminRequest {
  return { method: "GET", path: "/me", headers: {}, ...overrides };
}

describe("admin session", () => {
  it("parolni faqat serverda tekshiradi", () => {
    expect(verifyCredentials("admin@hodiyavto.uz", "s3cret-password", env)).toBe(true);
    expect(verifyCredentials("admin@hodiyavto.uz", "wrong", env)).toBe(false);
    expect(verifyCredentials("wrong@hodiyavto.uz", "s3cret-password", env)).toBe(false);
    expect(verifyCredentials("admin@hodiyavto.uz", "s3cret-password", {})).toBe(false);
  });

  it("imzolangan sessiyani yaratadi va tasdiqlaydi", () => {
    const user = { id: "1", email: "admin@hodiyavto.uz", role: "admin" as const };
    const { token } = createSession(user, env);
    expect(verifySession(token, env)).toEqual(user);
    expect(verifySession(token, { ...env, SESSION_SECRET: "y".repeat(48) })).toBeNull();
    expect(verifySession(`${token}tampered`, env)).toBeNull();
    expect(verifySession(undefined, env)).toBeNull();
  });

  it("eskirgan sessiyani rad etadi", () => {
    const user = { id: "1", email: "admin@hodiyavto.uz", role: "admin" as const };
    const { token } = createSession(user, env);
    void token;
    const expired = Buffer.from(
      JSON.stringify({ ...user, exp: Math.floor(Date.now() / 1000) - 1 })
    ).toString("base64url");
    const signature = createHmac("sha256", env.SESSION_SECRET!).update(expired).digest("base64url");
    expect(verifySession(`${expired}.${signature}`, env)).toBeNull();
  });
});

describe("admin API handler", () => {
  it("login javobida token yo'q, faqat HttpOnly cookie bor", async () => {
    const response = await handleAdminRequest(
      request({
        method: "POST",
        path: "/login",
        body: { email: "admin@hodiyavto.uz", password: "s3cret-password" },
      }),
      env
    );

    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      user: { id: "1", email: "admin@hodiyavto.uz", role: "admin" },
    });
    const cookie = response.headers["Set-Cookie"];
    expect(cookie).toContain(`${SESSION_COOKIE}=`);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).not.toContain("Secure");
    expect(response.body).not.toContain("password");
  });

  it("noto'g'ri parolda cookie yuborilmaydi", async () => {
    const response = await handleAdminRequest(
      request({
        method: "POST",
        path: "/login",
        body: { email: "admin@hodiyavto.uz", password: "wrong" },
      }),
      env
    );
    expect(response.status).toBe(401);
    expect(response.headers["Set-Cookie"]).toBeUndefined();
  });

  it("proxy faqat autentifikatsiyalangan so'rovlarni o'tkazadi", async () => {
    const originalFetch = globalThis.fetch;
    let called = false;
    globalThis.fetch = async () => {
      called = true;
      return new Response(JSON.stringify([{ id: 1 }]), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    try {
      const unauthorized = await handleAdminRequest(request({ path: "/proxy/cars" }), env);
      expect(unauthorized.status).toBe(401);
      expect(called).toBe(false);

      const login = await handleAdminRequest(
        request({
          method: "POST",
          path: "/login",
          body: { email: "admin@hodiyavto.uz", password: "s3cret-password" },
        }),
        env
      );
      const cookie = login.headers["Set-Cookie"].split(";")[0];
      const authorized = await handleAdminRequest(
        request({ path: "/proxy/cars", headers: { cookie } }),
        env
      );
      expect(authorized.status).toBe(200);
      expect(called).toBe(true);
      expect(parseCookies(cookie)[SESSION_COOKIE]).toBeTruthy();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("logout cookieni o'chiradi", async () => {
    const response = await handleAdminRequest(request({ method: "POST", path: "/logout" }), env);
    expect(response.status).toBe(200);
    expect(response.headers["Set-Cookie"]).toContain("Max-Age=0");
  });
});
