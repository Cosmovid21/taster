import type { OnboardingPreferences, PracticeArea, PracticeProfile, Interest } from "@/Lib/types";
import { interests } from "@/Lib/interests";

export const interestOptions = interests.map(({ slug, title, icon, category }) => ({ slug, title, icon, category }));

export const onboardingGoals: { id: OnboardingPreferences["goal"]; label: string; description: string }[] = [
  { id: "make", label: "Make something", description: "Use your hands or imagination." },
  { id: "solve", label: "Untangle a puzzle", description: "Think, plan, and find a pattern." },
  { id: "reset", label: "Reset my energy", description: "Slow down or move a little." },
  { id: "express", label: "Express an idea", description: "Put a thought into words, images, or sound." },
  { id: "practical", label: "Learn a useful skill", description: "Try a small thing you can use again." },
];

export const sessionStyles: { id: OnboardingPreferences["sessionStyle"]; label: string; description: string }[] = [
  { id: "quiet", label: "A quiet solo moment", description: "Low noise, space to focus." },
  { id: "handsOn", label: "Something hands-on", description: "Make, arrange, cook, or build." },
  { id: "movement", label: "A little movement", description: "Get up, stretch, or change your view." },
  { id: "openEnded", label: "Room to experiment", description: "Try a few approaches and see what clicks." },
];

export const experienceOptions: { id: OnboardingPreferences["experience"]; label: string; description: string }[] = [
  { id: "new", label: "I’m brand new", description: "Start with the simplest first step." },
  { id: "some", label: "I’ve tried a little", description: "Help me find a way back in." },
  { id: "returning", label: "I’m returning to it", description: "Give me a gentle refresher." },
];

const goalWeights: Record<OnboardingPreferences["goal"], Partial<PracticeProfile>> = {
  make: { creativity: 1.4, sensoryAwareness: 0.5 },
  solve: { problemSolving: 1.5, focus: 0.8 },
  reset: { movement: 1.2, focus: 0.5, sensoryAwareness: 0.4 },
  express: { creativity: 1.3, focus: 0.3 },
  practical: { problemSolving: 0.7, sensoryAwareness: 0.7, focus: 0.4 },
};

const styleMatches: Record<OnboardingPreferences["sessionStyle"], string[]> = {
  quiet: ["sketching", "photography", "writing", "coding", "chess", "yoga"],
  handsOn: ["sketching", "cooking", "guitar", "coding"],
  movement: ["yoga", "guitar", "photography", "cooking"],
  openEnded: ["photography", "writing", "sketching", "cooking", "guitar"],
};

export function recommendInterests(preferences: OnboardingPreferences, catalog: Interest[] = interests) {
  const picked = new Set(preferences.interestSlugs);
  const goal = goalWeights[preferences.goal];
  const matches = styleMatches[preferences.sessionStyle];
  return catalog
    .map((interest) => {
      const goalScore = (Object.entries(goal) as [PracticeArea, number][]).reduce(
        (total, [area, weight]) => total + interest.activityMix[area] * weight,
        0,
      );
      const score = goalScore + (picked.has(interest.slug) ? 8 : 0) + (matches.includes(interest.slug) ? 2 : 0);
      return { interest, score, selectedByUser: picked.has(interest.slug) };
    })
    .sort((a, b) => b.score - a.score || a.interest.title.localeCompare(b.interest.title))
    .slice(0, 3);
}

const areaLabels: { id: PracticeArea; label: string; shortLabel: string }[] = [
  { id: "creativity", label: "Make & imagine", shortLabel: "Creativity" },
  { id: "problemSolving", label: "Solve & plan", shortLabel: "Problem solving" },
  { id: "focus", label: "Focus & follow through", shortLabel: "Focus" },
  { id: "sensoryAwareness", label: "Notice details", shortLabel: "Sensory noticing" },
  { id: "movement", label: "Move & reset", shortLabel: "Movement" },
];

export function buildActivityMix(recommended: { interest: Interest }[]) {
  const values = areaLabels.map(({ id, label, shortLabel }) => {
    const mean = recommended.length
      ? recommended.reduce((sum, item) => sum + item.interest.activityMix[id], 0) / recommended.length
      : 0;
    return { id, label, shortLabel, value: Math.round(mean * 10) / 10 };
  });
  return values.sort((a, b) => b.value - a.value);
}

export function parseOnboardingPreferences(value: unknown): OnboardingPreferences | undefined {
  if (!value || typeof value !== "object") return undefined;
  const candidate = value as Partial<OnboardingPreferences>;
  const validSlugs = interests.map((interest) => interest.slug);
  const valid = Array.isArray(candidate.interestSlugs)
    && candidate.interestSlugs.length >= 1
    && candidate.interestSlugs.length <= 3
    && candidate.interestSlugs.every((slug) => typeof slug === "string" && validSlugs.includes(slug))
    && onboardingGoals.some((item) => item.id === candidate.goal)
    && sessionStyles.some((item) => item.id === candidate.sessionStyle)
    && experienceOptions.some((item) => item.id === candidate.experience)
    && typeof candidate.includeReading === "boolean";
  return valid ? candidate as OnboardingPreferences : undefined;
}

export const readingSuggestions: Record<OnboardingPreferences["goal"], { title: string; minutes: number; summary: string; body: string }> = {
  make: {
    title: "Start before you feel ready",
    minutes: 3,
    summary: "A small creative session is about noticing, not producing a masterpiece.",
    body: "Choose one simple material and one small subject. Make a first version before searching for the perfect tool or tutorial. Then change just one thing in a second pass. The comparison is often more useful than trying to get the first attempt right.",
  },
  solve: {
    title: "Give a puzzle one more look",
    minutes: 3,
    summary: "A useful next move often comes from changing the question you ask.",
    body: "When a problem feels stuck, pause and name what you already know. Try one small move, then check what changed. In chess or coding, the habit is similar: make a guess you can test, rather than trying to hold every possibility in your head.",
  },
  reset: {
    title: "Make a little space to reset",
    minutes: 2,
    summary: "A short pause can be a complete activity all by itself.",
    body: "Pick a gentle movement or a place to look out of the window. Let the activity stay small enough that you can stop when the timer ends. You do not need to turn a short reset into a routine or a performance.",
  },
  express: {
    title: "Follow the detail that stays with you",
    minutes: 3,
    summary: "A photo, sentence, or sound can begin with one detail you noticed.",
    body: "Instead of starting with a big idea, collect one detail: a color, a phrase, a rhythm, or a small moment. Make something around that detail, then give it a title. A narrow starting point can make an open-ended activity easier to begin.",
  },
  practical: {
    title: "Practice one useful thing at a time",
    minutes: 3,
    summary: "Keep the first practice small enough to repeat tomorrow.",
    body: "Choose a skill you can try with the materials you already have. Break it into one action, do it slowly, and notice what you would change next time. A short practice is more useful when you know what you tried and what you might repeat.",
  },
};
