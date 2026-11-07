import Link from "next/link";
import { Suspense } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { DemoAccountLinks } from "@/components/DemoAccountLinks";
import { signOut } from "@/app/actions/auth";
import { isSupabaseConfigured } from "@/Lib/auth-config";
import { createSupabaseServerClient } from "@/Lib/supabase/server";

function AuthLinks() {
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

async function SupabaseAccountLinks() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return <AuthLinks />;
  const metadataName = user.user_metadata?.name;
  const name = typeof metadataName === "string" && metadataName ? metadataName : user.email;
  return (
    <div className="flex items-center gap-3">
      <span className="max-w-40 truncate text-sm font-semibold">{name}</span>
      <form action={signOut}>
        <button type="submit" className="rounded-full px-3 py-2 text-sm font-semibold">
          Sign out
        </button>
      </form>
    </div>
  );
}

function AccountSlot() {
  if (!isSupabaseConfigured()) return <DemoAccountLinks />;
  return (
    <Suspense fallback={<AuthLinks />}>
      <SupabaseAccountLinks />
    </Suspense>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <BrandLogo />
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1 text-sm font-semibold">
          <Link href="/explore" className="rounded-full px-3 py-2">
            Explore
          </Link>
          <Link href="/dashboard" className="rounded-full px-3 py-2">
            Dashboard
          </Link>
          <AccountSlot />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-ink-soft">
        <p>Curio · one 15-minute activity a day</p>
        <p>Progress stays on this device until a challenge sync exists.</p>
      </div>
    </footer>
  );
}
