import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields (accept either username or email)
    if ((!body.username && !body.email) || !body.password) {
      return NextResponse.json(
        { error: "Username/Email and password are required" },
        { status: 400 },
      );
    }

    const baseUrl = process.env.API_GAD_BASE_URL ?? "http://134.209.30.66";
    const apiUrl = `${baseUrl}/api/auth/login/`;

    console.log("[SignIn Wrapper] Full Details:", {
      baseUrl,
      apiUrl,
      env_API_GAD_BASE_URL: process.env.API_GAD_BASE_URL,
      username: body.username || body.email,
      hasPassword: !!body.password,
    });

    // Add AbortController for custom timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    console.log("[SignIn Wrapper] Sending fetch request...");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log("[SignIn Wrapper] Response received:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[SignIn Wrapper] Upstream API error:", {
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
          error: errorDetails.error || "Sign in failed",
          details: errorDetails.details || errorDetails,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    console.error("Sign in API error:", error);

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
