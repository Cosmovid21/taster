"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff } from "lucide-react";
import {
  requestPasswordReset,
  signIn,
  signUp,
  type AuthFormState,
} from "@/app/actions/auth";
import { PrimaryButton } from "@/components/PrimaryButton";
import { isSupabaseConfigured } from "@/Lib/auth-config";
import { saveDemoProfile } from "@/Lib/storage";
import { passwordChecks, validateEmail, validateName } from "@/Lib/validation";

const initialState: AuthFormState = {};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-[#9a3b2f]">
      {message}
    </p>
  );
}

function ModeNotice({ configured }: { configured: boolean }) {
  if (configured) {
    return (
      <p className="rounded-2xl bg-sky/80 px-4 py-3 text-sm leading-6">
        Supabase Auth is configured. Curio will create a real account session.
      </p>
    );
  }
  return (
    <p className="rounded-2xl bg-lime px-4 py-3 text-sm leading-6">
      Local development mode. Supabase environment variables are missing, so these forms cannot sign you in or create an account.
    </p>
  );
}

function Status({ state }: { state: AuthFormState }) {
  if (!state.error && !state.success) return null;
  return (
    <p
      role="alert"
      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${state.success ? "bg-sky/80" : "bg-[#FFD9D0]"}`}
    >
      {state.success ?? state.error}
    </p>
  );
}

function PasswordField({
  id,
  name,
  autoComplete,
  error,
  value,
  onChange,
}: {
  id: string;
  name: string;
  autoComplete: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        Password
      </label>
      <div className="mt-2 flex rounded-2xl border border-ink/10 bg-white focus-within:border-ink">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full bg-transparent px-4 py-3 outline-none"
        />
        <button
          type="button"
          className="px-3 text-ink-soft"
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [state, action, pending] = useActionState(signIn, initialState);
  const [email, setEmail] = useState("");
  const [demoError, setDemoError] = useState("");

  function continueInDemo() {
    const emailError = validateEmail(email);
    if (emailError) {
      setDemoError(emailError);
      return;
    }
    const name = email.split("@")[0] || "Explorer";
    saveDemoProfile({ name, email });
    router.push("/dashboard");
  }

  return (
    <div className="space-y-5">
      <ModeNotice configured={configured} />
      <Status state={state} />
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
          />
          <FieldError id="email-error" message={state.fieldErrors?.email} />
        </div>
        <PasswordField
          id="password"
          name="password"
          autoComplete="current-password"
          error={state.fieldErrors?.password}
        />
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link href="/forgot-password" className="font-semibold underline decoration-ink/30">
            Forgot password
          </Link>
        </div>
        <PrimaryButton type="submit" disabled={pending} className="w-full">
          {pending ? "Checking…" : "Log in"}
        </PrimaryButton>
      </form>
      {configured ? null : (
        <div className="space-y-2">
          <PrimaryButton type="button" variant="secondary" className="w-full" onClick={continueInDemo}>
            Continue in demo mode
          </PrimaryButton>
          {demoError ? <p className="text-sm text-[#9a3b2f]">{demoError}</p> : null}
          <p className="text-xs leading-5 text-ink-soft">
            Demo mode stores a display name in this browser. It does not check your password.
          </p>
        </div>
      )}
      <p className="text-sm text-ink-soft">
        New to Curio?{" "}
        <Link href="/signup" className="font-semibold text-ink underline decoration-ink/30">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [state, action, pending] = useActionState(signUp, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demoError, setDemoError] = useState("");

  function continueInDemo() {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    if (nameError || emailError) {
      setDemoError(nameError ?? emailError ?? "");
      return;
    }
    saveDemoProfile({ name, email });
    router.push("/dashboard");
  }

  return (
    <div className="space-y-5">
      <ModeNotice configured={configured} />
      <Status state={state} />
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
          />
          <FieldError id="name-error" message={state.fieldErrors?.name} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "signup-email-error" : undefined}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
          />
          <FieldError id="signup-email-error" message={state.fieldErrors?.email} />
        </div>
        <PasswordField
          id="password"
          name="password"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
          error={state.fieldErrors?.password}
        />
        <ul className="space-y-1 text-sm" aria-label="Password requirements">
          {passwordChecks(password).map((check) => (
            <li key={check.label} className="flex items-center gap-2">
              <Check aria-hidden className={`h-4 w-4 ${check.met ? "text-ink" : "text-ink/25"}`} />
              <span>
                {check.label}
                <span className="sr-only">{check.met ? ", met" : ", needed"}</span>
              </span>
            </li>
          ))}
        </ul>
        <PrimaryButton type="submit" disabled={pending} className="w-full">
          {pending ? "Creating account…" : "Create account"}
        </PrimaryButton>
      </form>
      {configured ? null : (
        <div className="space-y-2">
          <PrimaryButton type="button" variant="secondary" className="w-full" onClick={continueInDemo}>
            Continue in demo mode
          </PrimaryButton>
          {demoError ? <p className="text-sm text-[#9a3b2f]">{demoError}</p> : null}
          <p className="text-xs leading-5 text-ink-soft">
            Demo mode ignores the password and does not create a Supabase user.
          </p>
        </div>
      )}
      <p className="text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-ink underline decoration-ink/30">
          Log in
        </Link>
      </p>
    </div>
  );
}

export function ForgotPasswordForm() {
  const configured = isSupabaseConfigured();
  const [state, action, pending] = useActionState(requestPasswordReset, initialState);
  return (
    <div className="space-y-5">
      <ModeNotice configured={configured} />
      <Status state={state} />
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "reset-email-error" : undefined}
            className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
          />
          <FieldError id="reset-email-error" message={state.fieldErrors?.email} />
        </div>
        <PrimaryButton type="submit" disabled={pending} className="w-full">
          {pending ? "Sending…" : "Send reset link"}
        </PrimaryButton>
      </form>
      <p className="text-sm">
        <Link href="/login" className="font-semibold underline decoration-ink/30">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
