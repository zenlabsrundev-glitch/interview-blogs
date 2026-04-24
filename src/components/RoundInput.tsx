"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type RoundDifficulty } from "@/types/post";

interface RoundInputProps {
  index: number;
  round: {
    name: string;
    difficulty: RoundDifficulty;
    questions: string[];
  };
  onChange: (index: number, round: RoundInputProps["round"]) => void;
  onRemove: (index: number) => void;
}

export function RoundInput({ index, round, onChange, onRemove }: RoundInputProps) {
  const updateRound = (updates: Partial<RoundInputProps["round"]>) => {
    onChange(index, { ...round, ...updates });
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
      <div className="mb-3 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          value={round.name}
          onChange={(e) => updateRound({ name: e.target.value })}
          placeholder="Round name"
          className="rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2"
        />
        <select
          value={round.difficulty}
          onChange={(e) =>
            updateRound({ difficulty: e.target.value as RoundDifficulty })
          }
          className="rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onRemove(index)}
          className="justify-center"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {round.questions.map((question, qIndex) => (
          <input
            key={`${index}-${qIndex}`}
            value={question}
            onChange={(e) => {
              const questions = [...round.questions];
              questions[qIndex] = e.target.value;
              updateRound({ questions });
            }}
            placeholder={`Question ${qIndex + 1}`}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none ring-blue-500/30 focus:ring-2"
          />
        ))}
      </div>

      <Button
        type="button"
        variant="secondary"
        className="mt-3"
        onClick={() => updateRound({ questions: [...round.questions, ""] })}
      >
        Add Question
      </Button>
    </div>
  );
}
