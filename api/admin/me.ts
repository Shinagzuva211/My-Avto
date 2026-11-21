import { serveAdmin, type VercelRequest, type VercelResponse } from "./_vercel";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await serveAdmin(() => "/me", req, res);
}
