import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/posts";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") ?? "1");
  const company = searchParams.get("company") ?? "";
  const role = searchParams.get("role") ?? "";
  const result = searchParams.get("result") ?? "";

  try {
    const data = await getPosts(page, {
      company,
      role,
      result: result === "Selected" || result === "Rejected" ? result : undefined,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();

  const body = await request.json();
  const payload = {
    user_id: user.id,
    company: body.company,
    role: body.role,
    experience_level: body.experience_level,
    result: body.result,
    rounds: body.rounds,
    tips: body.tips,
  };

  const { data: inserted, error } = await supabase
    .from("posts")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ post: inserted }, { status: 201 });
}
