/// <reference types="node" />
import { proxySegments, serveAdmin, type VercelRequest, type VercelResponse } from "./_vercel.js";

// `/api/admin/proxy?path=/cars` — statik funksiya, Vercel'ning SPA rewrite'iga uchramaydi.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await serveAdmin((request) => `/proxy/${proxySegments(request)}`, req, res);
}
