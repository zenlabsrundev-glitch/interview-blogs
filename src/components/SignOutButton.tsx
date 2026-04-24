"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.refresh();
  };

  return (
    <Button variant="secondary" onClick={signOut}>
      Sign out
    </Button>
  );
}

