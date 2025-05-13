import { NextRequest, NextResponse } from "next/server";

import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import { load } from "cheerio";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {

  // https://e.kul.pl/qlsidx.html?op=50&s_qpstud=12

  const cookieStore = await cookies();

  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, withCredentials: true }));

  console.log(cookieStore.get("s4el"));

  jar.setCookie(
    "s4el= " + cookieStore.get("s4el")?.value +
    "; path=/; domain=e.kul.pl",
    "https://e.kul.pl"
  )

  const pageFetch = await client("https://e.kul.pl/qlsidx.html?op=50&s_qpstud=12", {
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

  if(pageFetch.status !== 200) {
    return NextResponse.json({
      error: "Failed to fetch schedule",
    }, { status: 500 });
  }

  const $ = load(pageFetch.data);
  const schedule = $("table#datatab_1").html();
  const scheduleData = {
    schedule: schedule,
  };
  

  return NextResponse.json(
    scheduleData,
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
