import { proxyRequest } from "@/lib/proxy-utils";
export async function GET(req: Request) { return proxyRequest(req, "GET", "/api/analysis/profiles/"); }
export async function POST(req: Request) { return proxyRequest(req, "POST", "/api/analysis/profiles/"); }
