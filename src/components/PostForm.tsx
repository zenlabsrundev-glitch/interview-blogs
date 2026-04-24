"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
import { RoundInput } from "@/components/RoundInput";
import { Button } from "@/components/ui/button";
import { type RoundDifficulty } from "@/types/post";

const formSchema = z.object({
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  experience_level: z.enum(["Intern", "FTE"]),
  result: z.enum(["Selected", "Rejected"]),
  tips: z.string().min(12, "Share useful details"),
});

type FormData = z.infer<typeof formSchema>;

const initialRound = {
  name: "",
  difficulty: "Medium" as RoundDifficulty,
  questions: [""],
};

export function PostForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [apiError, setApiError] = useState("");
  const [roundError, setRoundError] = useState("");
  const [optimisticTitle, setOptimisticTitle] = useState("");
  const [rounds, setRounds] = useState([initialRound]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      role: "",
      experience_level: "Intern",
      result: "Selected",
      tips: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setApiError("");
    setRoundError("");
    const hasInvalidRounds = rounds.some(
      (round) =>
        round.name.trim().length < 2 ||
        round.questions.length === 0 ||
        round.questions.some((question) => question.trim().length < 2),
    );

    if (hasInvalidRounds) {
      setRoundError("Each round and question must be filled properly.");
      return;
    }

    setOptimisticTitle(`${data.company} - ${data.role}`);

    startTransition(async () => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rounds: rounds.map((round) => ({
          ...round,
          name: round.name.trim(),
          questions: round.questions.map((question) => question.trim()),
        })) }),
      });

      if (!response.ok) {
        const payload = await response.json();
        setApiError(payload.error ?? "Unable to create post");
        return;
      }

      router.push("/");
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border border-white/30 bg-white/70 p-6 shadow-xl shadow-zinc-900/5 backdrop-blur-xl"
    >
      {optimisticTitle && isPending && (
        <div className="rounded-2xl bg-blue-50 px-4 py-2 text-sm text-blue-700">
          Publishing {optimisticTitle}...
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium text-zinc-700">Company</span>
          <input
            {...register("company")}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2"
          />
          {errors.company && (
            <p className="text-xs text-rose-600">{errors.company.message}</p>
          )}
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-zinc-700">Role</span>
          <input
            {...register("role")}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2"
          />
          {errors.role && (
            <p className="text-xs text-rose-600">{errors.role.message}</p>
          )}
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium text-zinc-700">Experience</span>
          <select
            {...register("experience_level")}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2"
          >
            <option value="Intern">Intern</option>
            <option value="FTE">FTE</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-zinc-700">Result</span>
          <select
            {...register("result")}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2"
          >
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-800">Interview Rounds</h3>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setRounds((prev) => [...prev, initialRound])}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Round
          </Button>
        </div>
        <div className="space-y-3">
          {rounds.map((round, index) => (
            <RoundInput
              key={index}
              index={index}
              round={round}
              onChange={(idx, value) => {
                const next = [...rounds];
                next[idx] = value;
                setRounds(next);
              }}
              onRemove={(idx) =>
                setRounds((prev) => prev.filter((_, itemIndex) => itemIndex !== idx))
              }
            />
          ))}
          {roundError && <p className="text-xs text-rose-600">{roundError}</p>}
        </div>
      </div>

      <label className="space-y-1">
        <span className="text-sm font-medium text-zinc-700">Tips (Markdown)</span>
        <textarea
          {...register("tips")}
          rows={6}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2"
          placeholder="Share preparation strategy, resources, and mistakes to avoid..."
        />
        {errors.tips && <p className="text-xs text-rose-600">{errors.tips.message}</p>}
      </label>

      {apiError && <p className="text-sm text-rose-600">{apiError}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Publishing..." : "Publish Experience"}
      </Button>
    </form>
  );
}
