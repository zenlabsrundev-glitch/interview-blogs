import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export const COOKIE_NAME = "app_session_user_id";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string | null;
}

export async function setSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(COOKIE_NAME)?.value;
  if (!userId) return null;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("users")
    .select("id,email,name,avatar_url")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as SessionUser;
}

