import { NextRequest, NextResponse } from "next/server";

import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import { load } from "cheerio";
import { cookies } from "next/headers";

export type ScheduleEntry = {
  idx: number;
  Day: string;
  Room: string;
  Hours: string;
  Subject: string;
  Teacher: string;
  Cycle: string;
}

export async function GET(req: NextRequest) {

  // https://e.kul.pl/qlsidx.html?op=50&s_qpstud=12

  const cookieStore = await cookies();

  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, withCredentials: true }));

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

  const payload: ScheduleEntry[] = []
  let currentDay = ""; // this is for parsing the day header, not the actual day
  let idx=0;

  const $ = load(pageFetch.data);

  $('#datatab_1 tr').each((i, row) => {
    const $row = $(row);
  
    // Check for day header row
    if ($row.hasClass('s4row_1')) {
      currentDay = $row.find('td').text().split('(')[0].trim();
    }
  
    // Skip non-data rows
    if (!$row.hasClass('s4row_0')) return;
  
    const cells = $row.find('td');
  
    const room = $(cells[0]).text().trim();
    const time = $(cells[1]).text().trim().replace(/\s+/g, ' ');
    const cycle = $(cells[2]).text().trim();
    const subject = $(cells[3]).text().trim();
    const teacher = $(cells[4]).text().trim();
  
    payload.push({
      idx: idx++,
      Day: currentDay,
      Room: room,
      Hours: time,
      Cycle: cycle,
      Subject: subject,
      Teacher: teacher,
    });
  });
  

  return NextResponse.json(
    payload,
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
