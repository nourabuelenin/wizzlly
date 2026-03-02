import { proxyRequest } from "@/lib/proxy-utils";

export async function GET(req: Request) {
  return proxyRequest(req, "GET", "/api/stg2/meta/connect/callback/", {
    forwardQuery: true,
  });
}
