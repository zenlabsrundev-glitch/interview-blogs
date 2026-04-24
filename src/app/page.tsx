import { redirect } from "next/navigation";
import { PostsFeed } from "@/components/PostsFeed";
import { getSessionUser } from "@/lib/auth/session";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const user = await getSessionUser();
  if (!user) redirect("/auth/signup");

  const { posts } = await getPosts(1);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/30 bg-white/65 p-8 shadow-xl shadow-blue-900/5 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Placement Interview Experience Hub
        </h1>
        <p className="mt-2 max-w-3xl text-zinc-600">
          Discover structured interview breakdowns from real candidates, learn
          from their round-by-round questions, and share your own experience.
        </p>
      </section>
      <PostsFeed initialPosts={posts} />
    </div>
  );
}
