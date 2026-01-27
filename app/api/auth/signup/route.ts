import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.email || !body.password || !body.password_confirm) {
      return NextResponse.json(
        { error: "Email, password, and password confirmation are required" },
        { status: 400 },
      );
    }

    const apiUrl = `${process.env.API_GAD_BASE_URL ?? "http://134.209.30.66"}/api/auth/register/`;

    console.log("[SignUp Wrapper] Request:", {
      apiUrl,
      email: body.email,
      username: body.username,
    });

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

    console.log("[SignUp Wrapper] Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[SignUp Wrapper] Upstream API error:", {
        status: response.status,
        error: errorText,
      });

      // Parse error response
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = { message: errorText };
      }

      return NextResponse.json(
        {
          success: false,
          error: errorDetails.error || "Sign up failed",
          details: errorDetails.details || errorDetails,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, ...data }, { status: 201 });
  } catch (error) {
    console.error("Sign up API error:", error);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return NextResponse.json(
          {
            success: false,
            error: "Request timeout - Auth server not responding",
          },
          { status: 504 },
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: "Connection failed",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
