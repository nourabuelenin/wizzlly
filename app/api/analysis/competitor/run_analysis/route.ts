import { proxyRequest } from "@/lib/proxy-utils";
export async function POST(req: Request) { return proxyRequest(req, "POST", "/api/analysis/competitor/run_analysis/"); }
