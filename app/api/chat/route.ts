import { NextResponse } from "next/server";
import { ApiEndPoint } from "@/constants/api.constant";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const apiUrl = `${process.env.API_BASE_URL ?? "http://134.209.30.66:6060"}${ApiEndPoint.chatCompletions}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Upstream API error" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
