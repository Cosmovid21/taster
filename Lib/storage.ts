import { parseOnboardingPreferences } from "@/Lib/onboarding";
import type { OnboardingPreferences } from "@/Lib/types";

export const PROGRESS_KEY = "curio.progress.v1";
export const DEMO_KEY = "curio.demo.v1";
export const PROGRESS_EVENT = "curio-progress";
export const DEMO_EVENT = "curio-demo";

export type ProgressState = {
  activeSlug: string | null;
  completedDays: Record<string, number[]>;
  reflections: Record<string, string>;
  recentSlugs: string[];
  inProgressKey: string | null;
};

export type DemoProfile = {
  name: string;
  email: string;
  onboardingComplete?: boolean;
  preferences?: OnboardingPreferences;
};

export const emptyProgress: ProgressState = {
  activeSlug: null,
  completedDays: {},
  reflections: {},
  recentSlugs: [],
  inProgressKey: null,
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function progressSnapshot() {
  if (!canUseStorage()) return "";
  return localStorage.getItem(PROGRESS_KEY) ?? "";
}

export function demoSnapshot() {
  if (!canUseStorage()) return "";
  return localStorage.getItem(DEMO_KEY) ?? "";
}

export function parseProgress(raw: string): ProgressState {
  if (!raw) return emptyProgress;
  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      activeSlug: parsed.activeSlug ?? null,
      completedDays: parsed.completedDays ?? {},
      reflections: parsed.reflections ?? {},
      recentSlugs: parsed.recentSlugs ?? [],
      inProgressKey: parsed.inProgressKey ?? null,
    };
  } catch {
    return emptyProgress;
  }
}

export function parseDemo(raw: string): DemoProfile | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<DemoProfile>;
    if (!parsed.name || !parsed.email) return null;
    return {
      name: parsed.name,
      email: parsed.email,
      onboardingComplete: parsed.onboardingComplete === true,
      preferences: parseOnboardingPreferences(parsed.preferences),
    };
  } catch {
    return null;
  }
}

function writeProgress(next: ProgressState) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function updateProgress(
  mutate: (current: ProgressState) => ProgressState,
) {
  const current = parseProgress(progressSnapshot());
  writeProgress(mutate(current));
}

export function rememberInterest(slug: string) {
  updateProgress((current) => ({
    ...current,
    recentSlugs: [slug, ...current.recentSlugs.filter((item) => item !== slug)].slice(0, 6),
  }));
}

export function startChallenge(slug: string) {
  updateProgress((current) => ({
    ...current,
    activeSlug: slug,
    recentSlugs: [slug, ...current.recentSlugs.filter((item) => item !== slug)].slice(0, 6),
  }));
}

export function reflectionKey(slug: string, day: number) {
  return `${slug}:${day}`;
}

export function markActivityStarted(slug: string, day: number) {
  updateProgress((current) => ({
    ...current,
    activeSlug: slug,
    inProgressKey: reflectionKey(slug, day),
    recentSlugs: [slug, ...current.recentSlugs.filter((item) => item !== slug)].slice(0, 6),
  }));
}

export function completeActivity(slug: string, day: number, reflection: string) {
  updateProgress((current) => {
    const existing = current.completedDays[slug] ?? [];
    const completedDays = existing.includes(day) ? existing : [...existing, day].sort((a, b) => a - b);
    return {
      ...current,
      activeSlug: slug,
      completedDays: { ...current.completedDays, [slug]: completedDays },
      reflections: {
        ...current.reflections,
        [reflectionKey(slug, day)]: reflection,
      },
      inProgressKey: null,
      recentSlugs: [slug, ...current.recentSlugs.filter((item) => item !== slug)].slice(0, 6),
    };
  });
}

export function saveReflection(slug: string, day: number, reflection: string) {
  updateProgress((current) => ({
    ...current,
    reflections: {
      ...current.reflections,
      [reflectionKey(slug, day)]: reflection,
    },
  }));
}

export function saveDemoProfile(profile: DemoProfile) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(DEMO_EVENT));
}

export function clearDemoProfile() {
  localStorage.removeItem(DEMO_KEY);
  window.dispatchEvent(new Event(DEMO_EVENT));
}

export function nextIncompleteDay(completed: number[], total = 7) {
  for (let day = 1; day <= total; day += 1) {
    if (!completed.includes(day)) return day;
  }
  return total;
}
