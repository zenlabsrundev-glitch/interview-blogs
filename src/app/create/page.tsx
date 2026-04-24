import { redirect } from "next/navigation";
import { PostForm } from "@/components/PostForm";
import { getSessionUser } from "@/lib/auth/session";

export default async function CreatePage() {
  const user = await getSessionUser();
  if (!user) redirect("/auth/signin");

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-semibold">Create Interview Experience</h1>
      <p className="text-sm text-zinc-600">
        Share a structured, high-signal breakdown that helps future candidates.
      </p>
      <PostForm />
    </div>
  );
}
