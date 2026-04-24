"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center">
      <h2 className="text-xl font-semibold text-rose-700">Something went wrong</h2>
      <p className="mt-2 text-sm text-rose-600">
        We could not load this page. Please try again.
      </p>
      <Button className="mt-4" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
