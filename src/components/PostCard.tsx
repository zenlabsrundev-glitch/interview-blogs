import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { type Post } from "@/types/post";

function getResultStyle(result: string) {
  return result === "Selected"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-rose-100 text-rose-700";
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group block rounded-3xl border border-white/30 bg-white/70 p-6 shadow-xl shadow-zinc-900/5 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-zinc-900">{post.company}</h3>
          <p className="text-sm text-zinc-600">{post.role}</p>
        </div>
        <Badge className={getResultStyle(post.result)}>{post.result}</Badge>
      </div>

      <div className="mb-4 flex gap-2 text-xs text-zinc-500">
        <Badge className="bg-zinc-100 text-zinc-700">{post.experience_level}</Badge>
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>

      <div className="space-y-2">
        {post.rounds.slice(0, 2).map((round) => (
          <p key={round.name} className="text-sm text-zinc-700">
            <span className="font-medium">{round.name}:</span>{" "}
            {round.questions.slice(0, 2).join(", ")}
          </p>
        ))}
      </div>
    </Link>
  );
}
