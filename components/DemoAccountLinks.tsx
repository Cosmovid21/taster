"use client";

import Link from "next/link";
import { clearDemoProfile } from "@/Lib/storage";
import { useDemoProfile } from "@/components/useProgress";

export function DemoAccountLinks() {
  const demo = useDemoProfile();
  if (!demo) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="rounded-full px-3 py-2 text-sm font-semibold">
          Log in
        </Link>
        <Link href="/signup" className="rounded-full bg-ink px-3 py-2 text-sm font-semibold text-cream">
          Sign up
        </Link>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full bg-lime px-2 py-1 text-xs font-semibold">Demo</span>
      <span className="max-w-32 truncate text-sm font-semibold">{demo.name}</span>
      <button
        type="button"
        className="rounded-full px-3 py-2 text-sm font-semibold"
        onClick={() => clearDemoProfile()}
      >
        Exit demo
      </button>
    </div>
  );
}
