import { proxyRequest } from "@/lib/proxy-utils";
export async function GET(req: Request) { 
  const { search } = new URL(req.url);
  return proxyRequest(req, "GET", `/api/analysis/swot/latest/${search}`); 
}
