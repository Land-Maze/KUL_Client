import { NextResponse } from "next/server";
import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import { load } from "cheerio";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("s4el");
  if (!cookie) {
    return NextResponse.json({
      error: "Session expired",
    }, { status: 401 });
  }
  
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, withCredentials: true }));
  jar.setCookieSync(`s4el=${cookie.value}; path=/; domain=e.kul.pl; HttpOnly; Secure`, "https://e.kul.pl");

  const res = await client("https://e.kul.pl/login.html", {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Cache-Control": "max-age=0",
    },
  });

  if (load(res.data)("title").text().toLowerCase().includes("logowanie")) {
    return NextResponse.json({
      error: "Session expired",
    }, { status: 401 });
  }

  return NextResponse.json({
    status: "ok",
  });
}