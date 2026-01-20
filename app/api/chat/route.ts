import { NextResponse } from "next/server";
import { ApiEndPoint } from "@/constants/api.constant";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const apiUrl = `${process.env.API_BASE_URL ?? "http://134.209.30.66:6060"}${ApiEndPoint.chatCompletions}`;

    // Add AbortController for custom timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upstream API error:", errorText);
      return NextResponse.json(
        { error: "Upstream API error", details: errorText },
        { status: response.status },
      );
    }

    // If streaming is enabled, pipe the response as SSE
    if (body.options?.stream === true) {
      const reader = response.body?.getReader();
      if (!reader) {
        return NextResponse.json(
          { error: "No response body" },
          { status: 500 },
        );
      }

      const encoder = new TextEncoder();
      let streamClosed = false;

      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            const decoder = new TextDecoder();

            while (!streamClosed) {
              const { done, value } = await reader.read();
              if (done) {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                controller.close();
                break;
              }

              const chunk = decoder.decode(value, { stream: true });
              controller.enqueue(encoder.encode(chunk));
            }
          } catch (error) {
            console.error("Streaming error:", error);
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "error", error: String(error) })}\n\n`,
              ),
            );
            controller.close();
          }
        },
        cancel() {
          streamClosed = true;
        },
      });

      return new NextResponse(customReadable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);

    // More detailed error response
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout - API server not responding" },
          { status: 504 },
        );
      }
      return NextResponse.json(
        { error: "Connection failed", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
