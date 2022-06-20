import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname, origin } = req.nextUrl;

  if (req.ua?.isBot) {
    return new Response("Please don't be a bot. Be human.", { status: 403 });
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.starSession) {
      return NextResponse.rewrite(`${origin}/enter`);
    }
  }
}
