import { createAdminClient } from "@/lib/supabase/admin";
import { type Post, type PostResult } from "@/types/post";

const PAGE_SIZE = 6;

export interface PostFilters {
  company?: string;
  role?: string;
  result?: PostResult;
}

export async function getPosts(
  page = 1,
  filters: PostFilters = {},
): Promise<{ posts: Post[]; hasMore: boolean }> {
  const supabase = createAdminClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;

  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters.company) query = query.ilike("company", `%${filters.company}%`);
  if (filters.role) query = query.ilike("role", `%${filters.role}%`);
  if (filters.result) query = query.eq("result", filters.result);

  const { data, error } = await query;
  if (error) {
    if (error.message.includes("Could not find the table 'public.posts'")) {
      return { posts: [], hasMore: false };
    }
    throw new Error(error.message);
  }

  return {
    posts: (data ?? []) as Post[],
    hasMore: (data?.length ?? 0) > PAGE_SIZE - 1,
  };
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    if (error.message.includes("Could not find the table 'public.posts'")) {
      return null;
    }
    throw new Error(error.message);
  }
  return (data as Post | null) ?? null;
}
