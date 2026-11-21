import { serveAdmin, type VercelRequest, type VercelResponse } from "./_vercel.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await serveAdmin(() => "/login", req, res);
}
