import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

function isAuthed(req: NextRequest): boolean {
  const cookie = req.cookies.get("iman-admin")?.value;
  return !!cookie && cookie === process.env.ADMIN_PASSWORD;
}

const EXTRACTION_PROMPT = `You are analyzing a monthly prayer times schedule image from IMAN (Iranian-American Muslim Association) in Los Angeles.

The image contains a table with:
- Prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) for each day of the month
- Events and special occasions listed in a column (often in Farsi/Persian)
- Day numbers, day names (in both English and Farsi)
- The month and year

Extract ALL data into this exact JSON format:
{
  "month": "month name in English",
  "year": 2026,
  "hijriMonth": "Islamic month name if shown",
  "events": [
    {
      "day": 1,
      "eventFa": "original Farsi text of the event",
      "eventEn": "English translation of the event",
      "type": "recurring|special|holiday"
    }
  ],
  "prayerTimes": [
    {
      "day": 1,
      "fajr": "5:20",
      "sunrise": "6:34",
      "dhuhr": "12:07",
      "asr": "15:14",
      "maghrib": "17:55",
      "isha": "18:44"
    }
  ]
}

Rules:
- Translate ALL Farsi event names to English accurately
- "دعای کمیل" = "Dua Kumayl", "نماز جمعه" = "Jumu'ah Prayer", "کلاس قرآن" = "Quran Class"
- "شب احیا" = "Night of Revival (Shab-e Ehya)", "ولادت" = "Birthday of", "شهادت" = "Martyrdom of"
- "اول فروردین" = "Nowruz (Persian New Year)", "عید فطر" = "Eid al-Fitr"
- Keep times in 24-hour format as shown in the image
- Include ALL days of the month, even those without events
- For events, classify: "recurring" (weekly like Dua Kumayl), "special" (one-time), "holiday" (Eid, Nowruz)
- Return ONLY valid JSON, no markdown, no explanation`;

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = file.type || "image/png";

    // Call Gemini Vision
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      EXTRACTION_PROMPT,
      {
        inlineData: {
          mimeType,
          data: base64,
        },
      },
    ]);

    const responseText = result.response.text();

    // Parse JSON from response (strip markdown code fences if present)
    let jsonStr = responseText;
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const extracted = JSON.parse(jsonStr.trim());

    return NextResponse.json({
      success: true,
      data: extracted,
      rawResponse: responseText,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Extraction failed: ${message}` },
      { status: 500 }
    );
  }
}
