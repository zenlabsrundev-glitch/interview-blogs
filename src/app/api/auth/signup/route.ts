import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminClient } from "@/lib/supabase/admin";
import { setSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const name = String(body.name ?? "").trim();
  const password = String(body.password ?? "");

  if (!email || !name || password.length < 8) {
    return NextResponse.json(
      { error: "Please enter name, email, and a password (8+ characters)." },
      { status: 400 },
    );
  }

  const password_hash = await bcrypt.hash(password, 10);
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("users")
    .insert({ email, name, password_hash })
    .select("id")
    .single();

  if (error) {
    const msg = (error.message ?? "").toLowerCase();
    const isDuplicate =
      msg.includes("already exists") || msg.includes("duplicate") || error.code === "23505";
    return NextResponse.json(
      {
        error: isDuplicate
          ? "This email is already registered. Please sign in instead."
          : "Unable to create account. Please try again.",
      },
      { status: 400 },
    );
  }

  await setSession(data.id);
  return NextResponse.json({ ok: true, userId: data.id });
}

