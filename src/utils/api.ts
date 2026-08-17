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
    } catch (e) {
      console.error("Failed to parse JSON:", text.slice(0, 500));
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, baseDelay * (i + 1)));
        continue;
      }
      throw new Error(`Invalid JSON response: ${text.slice(0, 200)}`);
    }
  }
  throw new Error("Max retries exceeded");
};