export type Difficulty = "Beginner";

export type InterestIcon =
  | "Pencil"
  | "Camera"
  | "Code"
  | "CookingPot"
  | "PenLine"
  | "ChessKnight"
  | "Guitar"
  | "Flower2";

export type Activity = {
  day: number;
  title: string;
  description: string;
  instructions: string[];
  estimatedMinutes: number;
  materials: string[];
  reflectionQuestion: string;
};

export type Interest = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  icon: InterestIcon;
  difficulty: Difficulty;
  durationMinutes: number;
  challengeTitle: string;
  challengeDescription: string;
  outcome: string;
  relatedSlug: string;
  activities: Activity[];
};
