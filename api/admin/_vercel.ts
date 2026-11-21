/// <reference types="node" />
import { handleAdminRequest } from "./_handler.js";
import type { ServerEnv } from "./_auth.js";

type Headers = Record<string, string | string[] | undefined>;

export type VercelRequest = {
  method?: string;
  url?: string;
  headers: Headers;
  query?: Headers;
  body?: unknown;
  socket?: { remoteAddress?: string };
};

export type VercelResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => { send: (body: string) => void };
};

export async function serveAdmin(
  resolvePath: (req: VercelRequest) => string,
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const result = await handleAdminRequest(
    {
      method: req.method ?? "GET",
      path: resolvePath(req),
      headers: req.headers,
      query: req.query,
      body: req.body,
      clientIp: req.socket?.remoteAddress,
    },
    process.env as ServerEnv
  );

  for (const [name, value] of Object.entries(result.headers)) {
    res.setHeader(name, value);
  }
  res.status(result.status).send(result.body);
}

export function proxySegments(req: VercelRequest): string {
  const raw = req.query?.path;
  if (Array.isArray(raw)) return raw.join("/");
  return raw ?? "";
}
