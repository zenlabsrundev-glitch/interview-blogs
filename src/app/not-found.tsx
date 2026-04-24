import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white/70 p-6 text-center">
      <h2 className="text-2xl font-semibold text-zinc-900">Post not found</h2>
      <p className="mt-2 text-sm text-zinc-600">
        The interview experience you are looking for does not exist.
      </p>
      <Link href="/" className="mt-4 inline-block text-sm font-medium text-blue-600">
        Back to feed
      </Link>
    </div>
  );
}
