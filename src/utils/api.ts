export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries = 3,
  baseDelay = 2000
): Promise<unknown> => {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    const text = await res.text();

    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, baseDelay * (i + 1)));
        continue;
      }
      throw new Error("Service waking up, please retry");
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON response");
    }
  }
  throw new Error("Max retries exceeded");
};