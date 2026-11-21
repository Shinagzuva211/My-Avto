/// <reference types="node" />
import { proxySegments, serveAdmin, type VercelRequest, type VercelResponse } from "./_vercel.js";

// `/api/admin/auth-proxy?path=/api/users`
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await serveAdmin((request) => `/auth-proxy/${proxySegments(request)}`, req, res);
}
