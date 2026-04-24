"use client";

import { Search } from "lucide-react";
import { type PostResult } from "@/types/post";

interface FilterState {
  company: string;
  role: string;
  result: "" | PostResult;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="sticky top-20 z-20 mb-6 grid gap-3 rounded-3xl border border-white/30 bg-white/70 p-4 shadow-lg shadow-zinc-900/5 backdrop-blur-xl md:grid-cols-3">
      <label className="relative">
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" />
        <input
          value={filters.company}
          onChange={(e) => onChange({ ...filters, company: e.target.value })}
          className="w-full rounded-2xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-blue-500/30 transition focus:ring-2"
          placeholder="Filter company"
        />
      </label>
      <input
        value={filters.role}
        onChange={(e) => onChange({ ...filters, role: e.target.value })}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-blue-500/30 transition focus:ring-2"
        placeholder="Filter role"
      />
      <select
        value={filters.result}
        onChange={(e) =>
          onChange({ ...filters, result: e.target.value as "" | PostResult })
        }
        className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-blue-500/30 transition focus:ring-2"
      >
        <option value="">All results</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}
