export type Skill = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  days: string[];
};

export const skills: Skill[] = [
  {
    slug: "sketching",
    name: "Sketching",
    emoji: "✏️",
    tagline: "Draw something real in 15 minutes a day",
    days: [
      "Draw 20 straight lines and 20 circles, without a ruler",
      "Sketch a cup on your desk, outlines only",
      "Draw the same cup again and add shadows",
      "Sketch your hand in 3 different poses",
      "Draw a plant or a tree near you",
      "Copy a photo of a face, simple shapes only",
      "Draw anything you like and note how you felt doing it",
    ],
  },
  {
    slug: "coding",
    name: "Basic Coding",
    emoji: "💻",
    tagline: "Build your first tiny program",
    days: [
      "Open a free online editor (like replit.com or the browser console) and print 'Hello' on the screen",
      "Create a variable for your name and print a greeting using it",
      "Write an if/else: print 'adult' or 'minor' based on an age number",
      "Write a loop that prints the numbers 1 to 10",
      "Write a function that takes two numbers and returns their sum",
      "Make a list of 5 foods and print each one using a loop",
      "Combine it all: build a tiny program (a tip calculator or number guesser) and note how you felt doing it",
    ],
  },
  {
    slug: "photography",
    name: "Photography",
    emoji: "📷",
    tagline: "Learn to see light and framing",
    days: [
      "Take 10 photos of one object from 10 different angles",
      "Photograph something using only window light, and notice where the shadows fall",
      "Practice the rule of thirds: take 5 photos with the subject off-center",
      "Find leading lines (roads, fences, corridors) and take 5 photos using them",
      "Take 5 close-up photos of textures: bark, fabric, food, walls",
      "Take a portrait of a friend or family member in soft light",
      "Pick your best 3 photos from the week and note what made them work and how you felt doing it",
    ],
  },
  {
    slug: "cooking",
    name: "Cooking",
    emoji: "🍳",
    tagline: "Master one simple dish from scratch",
    days: [
      "Learn knife basics: practice safely cutting an onion, a tomato, and a potato",
      "Make perfect scrambled or boiled eggs, and time them",
      "Cook plain rice or pasta and get the water ratio right",
      "Make a simple tadka or sauce from scratch: oil, spices, onions, tomato",
      "Cook one vegetable dish and taste and adjust the salt as you go",
      "Combine your skills into a full meal: a main plus a side",
      "Cook your favorite simple dish for someone else, and note how you felt doing it",
    ],
  },
  {
    slug: "writing",
    name: "Writing",
    emoji: "📝",
    tagline: "Find your voice in a few lines a day",     days: [
      "Write nonstop for 10 minutes about your day, with no editing",
      "Describe a place you know well using all five senses",
      "Write a 100-word story with a beginning, middle, and end",
      "Write a short letter to your future self one year from now",
      "Rewrite yesterday's story in a different tone: funny, sad, or mysterious",
      "Write about a memory that still makes you smile",
      "Pick your favorite piece from the week, polish it, and note how you felt doing it",
    ],
  },
  {
    slug: "guitar",
    name: "Guitar",
    emoji: "🎸",
    tagline: "Play your first chords",
    days: [
      "Learn the parts of the guitar and tune it (use a free tuner app)",
      "Practice pressing single strings cleanly, one finger at a time",
      "Learn the Em chord and strum it slowly",
      "Learn the Am chord and switch between Em and Am for 10 minutes",
      "Learn the C and G chords",
      "Strum a simple four-chord pattern (G, C, Em, Am) along with a slow beat",
      "Play along to an easy song you like, and note how you felt doing it",
    ],
  },
];