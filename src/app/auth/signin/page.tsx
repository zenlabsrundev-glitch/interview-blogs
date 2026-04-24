"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const created = searchParams.get("created") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const payload = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(payload.error ?? "Unable to sign in");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Sign in to continue exploring experiences.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-white/30 bg-white/70 p-6 shadow-xl shadow-zinc-900/5 backdrop-blur-xl"
        >
        {created && (
          <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            Account created successfully. Please sign in.
          </div>
        )}
        <label className="space-y-1">
          <span className="text-sm font-medium text-zinc-700">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-blue-500/30 focus:ring-2"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-zinc-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none ring-blue-500/30 focus:ring-2"
          />
        </label>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <div className="pt-2">
          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <p className="text-sm text-zinc-600">
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-blue-600" href="/auth/signup">
            Sign up
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
}

