import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth/session";
import { SignOutButton } from "@/components/SignOutButton";

export async function Navbar() {
  const user = await getSessionUser();

  const userName =
    user?.name ?? user?.email?.split("@")[0] ?? "Guest";
  const avatar = user?.avatar_url ?? undefined;

  return (
    <header className="sticky top-0 z-30 border-b border-white/20 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900">
          Placement Interview Experience Hub
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/create">
            <Button>Create Post</Button>
          </Link>
          {user ? (
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center rounded-full border border-zinc-200 bg-white p-1.5 shadow-sm">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={userName}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700">
                    {userName.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </summary>
              <div className="absolute right-0 top-12 w-56 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl">
                <p className="truncate text-sm font-medium text-zinc-900">{userName}</p>
                <p className="truncate text-xs text-zinc-500">{user.email}</p>
                <div className="mt-3">
                  <SignOutButton />
                </div>
              </div>
            </details>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/signin">
                <Button variant="secondary">Sign in</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
