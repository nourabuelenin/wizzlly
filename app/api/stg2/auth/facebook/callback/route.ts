import { proxyRequest } from "@/lib/proxy-utils";

export async function GET(req: Request) {
  return proxyRequest(req, "GET", "/api/stg2/auth/facebook/callback/", {
    forwardQuery: true,
  });
}
