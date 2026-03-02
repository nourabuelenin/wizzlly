import { proxyRequest } from "@/lib/proxy-utils";
export async function POST(req: Request) { return proxyRequest(req, "POST", "/api/analysis/market/run_analysis/"); }
