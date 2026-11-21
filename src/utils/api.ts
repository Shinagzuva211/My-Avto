export const ADMIN_API_URL = "/api/admin";

/** Admin so'rovlari hech qachon parolni brauzerga yubormaydi — faqat session cookie ishlatiladi. */
export async function fetchAdmin(path: string, options: RequestInit = {}): Promise<unknown> {
  try {
    return await fetchWithRetry(`${ADMIN_API_URL}${path}`, {
      ...options,
      credentials: "include",
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("HTTP 401")) {
      window.dispatchEvent(new Event("admin-session-expired"));
    }
    throw error;
  }
}

// Statik Vercel funksiyalari: /api/admin/proxy?path=/cars
// (dynamic catch-all yo'llari SPA rewrite'ga uchib qolgani uchun query parametrdan foydalanamiz)
export const adminProxy = (path: string) => `/proxy?path=${encodeURIComponent(path)}`;
export const adminAuthProxy = (path: string) => `/auth-proxy?path=${encodeURIComponent(path)}`;

const AUTH_API_FALLBACK = import.meta.env.DEV
  ? "http://localhost:3001"
  : "https://authorization-8nex.onrender.com";

export const AUTH_API_URL = (
  import.meta.env.VITE_AUTH_API_URL || AUTH_API_FALLBACK
).replace(/\/$/, "");

export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries = 3,
  baseDelay = 2000
): Promise<unknown> => {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    const text = await res.text();

    const trimmed = text.trim();
    const isHtml = trimmed.startsWith("<!DOCTYPE") || 
                   trimmed.startsWith("<html") || 
                   trimmed.startsWith("<head") ||
                   trimmed.startsWith("<body") ||
                   trimmed.startsWith("<div");

    if (isHtml) {
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, baseDelay * (i + 1)));
        continue;
      }
      throw new Error("Service waking up, please retry");
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    }

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse JSON:", text.slice(0, 500));
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, baseDelay * (i + 1)));
        continue;
      }
      throw new Error(`Invalid JSON response: ${text.slice(0, 200)}`, { cause: err });
    }
  }
  throw new Error("Max retries exceeded");
};