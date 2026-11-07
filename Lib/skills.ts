import { interests } from "@/Lib/interests";

const emojiBySlug: Record<string, string> = {
  sketching: "✏️",
  coding: "💻",
  photography: "📷",
  cooking: "🍳",
  writing: "📝",
  guitar: "🎸",
  chess: "♟️",
  yoga: "🧘",
};

/** Original Taster skill shape, derived from the Curio interest catalog. */
export type Skill = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  days: string[];
};

export const skills: Skill[] = interests.map((interest) => ({
  slug: interest.slug,
  name: interest.title,
  emoji: emojiBySlug[interest.slug] ?? "✦",
  tagline: interest.challengeDescription,
  days: interest.activities.map((activity) => activity.title),
}));
