import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { getPostById } from "@/lib/posts";

function getDifficultyStyles(difficulty: string) {
  if (difficulty === "Easy") return "bg-emerald-100 text-emerald-700";
  if (difficulty === "Hard") return "bg-rose-100 text-rose-700";
  return "bg-amber-100 text-amber-700";
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-white/30 bg-white/70 p-6 shadow-xl shadow-zinc-900/5 backdrop-blur-xl">
      <header className="space-y-3 border-b border-zinc-200 pb-4">
        <h1 className="text-3xl font-semibold">{post.company}</h1>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-zinc-100 text-zinc-700">{post.role}</Badge>
          <Badge className="bg-zinc-100 text-zinc-700">
            {post.experience_level}
          </Badge>
          <Badge
            className={
              post.result === "Selected"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }
          >
            {post.result}
          </Badge>
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Rounds Timeline</h2>
        <div className="space-y-4 border-l-2 border-blue-200 pl-6">
          {post.rounds.map((round, index) => (
            <div key={`${round.name}-${index}`} className="relative">
              <span className="absolute -left-[34px] top-1 h-3 w-3 rounded-full bg-blue-500" />
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">{round.name}</h3>
                  <Badge className={getDifficultyStyles(round.difficulty)}>
                    {round.difficulty}
                  </Badge>
                </div>
                <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
                  {round.questions.map((question, qIndex) => (
                    <li key={`${question}-${qIndex}`}>{question}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Tips</h2>
        <div className="prose prose-zinc max-w-none rounded-2xl border border-zinc-200 bg-white p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.tips}</ReactMarkdown>
        </div>
      </section>
    </article>
  );
}
