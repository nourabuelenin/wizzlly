import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.API_BASE_URL ?? "http://134.209.30.66";

  console.log("[Auth Debug] Environment:", {
    API_BASE_URL: process.env.API_BASE_URL,
    baseUrl,
    nodeEnv: process.env.NODE_ENV,
  });

  try {
    // Try to reach the backend
    const loginUrl = `${baseUrl}/api/auth/login/`;
    const registerUrl = `${baseUrl}/api/auth/register/`;

    console.log("[Auth Debug] Testing URLs:", { loginUrl, registerUrl });

    const loginTest = await Promise.race([
      fetch(loginUrl, {
        method: "OPTIONS",
        headers: { "Content-Type": "application/json" },
      }).catch((e) => ({ error: e.message })),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000),
      ),
    ]);

    return NextResponse.json(
      {
        debug: {
          baseUrl,
          env_API_BASE_URL: process.env.API_BASE_URL,
          loginUrl,
          registerUrl,
          loginTest:
            loginTest instanceof Response
              ? { status: loginTest.status, statusText: loginTest.statusText }
              : { error: "Failed to connect" },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Debug check failed",
        details: error instanceof Error ? error.message : String(error),
        baseUrl,
      },
      { status: 500 },
    );
  }
}
