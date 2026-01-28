import { NextResponse } from "next/server";

// GET - Fetch user profile
export async function GET(req: Request) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const baseUrl = process.env.API_GAD_BASE_URL ?? "http://134.209.30.66";
    const apiUrl = `${baseUrl}/api/auth/profile/`;

    console.log("[Profile GET] Request:", {
      apiUrl,
      hasToken: !!token,
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log("[Profile GET] Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Profile GET] Error:", {
        status: response.status,
        error: errorText,
      });

      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = { message: errorText };
      }

      return NextResponse.json(
        {
          success: false,
          error: errorDetails.error || errorDetails.detail || "Failed to fetch profile",
          details: errorDetails.details || errorDetails,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    console.error("Profile GET error:", error);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return NextResponse.json(
          {
            success: false,
            error: "Request timeout - Server not responding",
          },
          { status: 504 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: "Connection failed",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Get token from Authorization header
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const baseUrl = process.env.API_GAD_BASE_URL ?? "http://134.209.30.66";
    const apiUrl = `${baseUrl}/api/auth/profile/`;

    console.log("[Profile PUT] Request:", {
      apiUrl,
      hasToken: !!token,
      hasKnowledgeBase: !!body.knowledge_base,
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log("[Profile PUT] Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Profile PUT] Error:", {
        status: response.status,
        error: errorText,
      });

      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = { message: errorText };
      }

      return NextResponse.json(
        {
          success: false,
          error: errorDetails.error || errorDetails.detail || "Failed to update profile",
          details: errorDetails.details || errorDetails,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error) {
    console.error("Profile PUT error:", error);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return NextResponse.json(
          {
            success: false,
            error: "Request timeout - Server not responding",
          },
          { status: 504 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: "Connection failed",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
