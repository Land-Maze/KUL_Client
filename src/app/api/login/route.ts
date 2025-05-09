import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import { load } from "cheerio";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, withCredentials: true }));

  const pageFetch = await client("https://e.kul.pl/login.html", {
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

  const post_kod = load(pageFetch.data)("input[name=post_kod]").val();

  const res = await client("https://e.kul.pl/login.html", {
    method: "POST",
    headers: {
      "Referer": "https://e.kul.pl/login.html",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://e.kul.pl",
      DNT: "1",
      "Upgrade-Insecure-Requests": "1",
    },
    data: new URLSearchParams({
      login: formData.get("login") as string,
      password: formData.get("password") as string,
      op: "1",
      js: "1",
      post_kod: post_kod as string,
    }),
  });

  if(load(res.data)("title").text().toLowerCase().includes("logowanie")) {
    return NextResponse.json({
      error: "Invalid credentials",
    }, { status: 401 });
  }
  
  const cookieStore = await cookies();

  cookieStore.set({
    name: "s4el",
    value: (await jar.getCookieString("https://e.kul.pl")).split("=")[1],
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
    maxAge: (formData.get("expiringTillDay") as string) === "true" ? 60 * 60 * 24 : undefined, // 1 day
  })
  
  return NextResponse.json({
    status: "ok",
  });
}
