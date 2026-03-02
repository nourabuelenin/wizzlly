import { proxyRequest } from "@/lib/proxy-utils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyRequest(req, "GET", `/api/campaigns/${id}/full/`);
}
