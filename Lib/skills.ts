export type Skill = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
};

export const skills: Skill[] = [
  { slug: "sketching", name: "Sketching", emoji: "✏️", tagline: "Draw something real in 15 minutes a day" },
  { slug: "coding", name: "Basic Coding", emoji: "💻", tagline: "Build your first tiny program" },
  { slug: "photography", name: "Photography", emoji: "📷", tagline: "Learn to see light and framing" },
  { slug: "cooking", name: "Cooking", emoji: "🍳", tagline: "Master one simple dish from scratch" },
  { slug: "writing", name: "Writing", emoji: "📝", tagline: "Find your voice in a few lines a day" },
  { slug: "guitar", name: "Guitar", emoji: "🎸", tagline: "Play your first chords" },
];