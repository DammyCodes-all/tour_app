import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const tour_id = url.searchParams.get("tour_id") ?? undefined;
    if (!tour_id) {
      return NextResponse.json(
        { error: "Missing tour_id" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const supabase = createClient();

    const { data, error } = await (await supabase)
      .from("tours")
      .select(
        "*, tour_steps (id, tour_id, step_number, step_id, target_selector, title, content, placement)"
      )
      .eq("id", tour_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers: CORS_HEADERS }
      );
    }
    return NextResponse.json(data, { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
