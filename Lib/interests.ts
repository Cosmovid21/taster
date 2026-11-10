import type { Activity, Interest } from "@/Lib/types";

const cover = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=80`;

function days(items: Activity[]): Activity[] {
  return items;
}

export const interests: Interest[] = [
  {
    id: "sketching",
    slug: "sketching",
    title: "Sketching",
    category: "Art",
    description:
      "Learn to look slowly and put a real object on paper with a pencil you already own.",
    coverImage: cover("photo-1513364776144-60967b0f800f"),
    icon: "Pencil",
    difficulty: "Beginner",
    durationMinutes: 15,
    challengeTitle: "Seven days of drawing what is in front of you",
    challengeDescription: "Draw something real in 15 minutes a day.",
    outcome:
      "After seven days you can block in simple objects, add shadow, and tell which drawings feel more alive.",
    relatedSlug: "photography",
    activityMix: { creativity: 5, problemSolving: 2, focus: 4, sensoryAwareness: 5, movement: 1 },
    activities: days([
      {
        day: 1,
        title: "Lines, circles, and a looser hand",
        description: "Warm up the two marks almost every sketch is built from.",
        instructions: [
          "Set a 15-minute timer. Use any pencil and a blank sheet.",
          "Fill half the page with straight lines and half with circles. Do not reach for a ruler.",
          "Mark three lines and three circles that feel clearer than the rest.",
        ],
        estimatedMinutes: 15,
        materials: ["Pencil", "Paper"],
        reflectionQuestion: "Where did your hand tense, and which marks felt easiest?",
      },
      {
        day: 2,
        title: "Outline the cup on your desk",
        description: "Draw one ordinary object using only its outer edge.",
        instructions: [
          "Place a cup where you can see the rim as an ellipse, not a flat circle.",
          "Draw the outline only. Leave out logos, shadows, and decoration.",
          "Compare the drawing with the cup and correct one proportion that looks off.",
        ],
        estimatedMinutes: 15,
        materials: ["Pencil", "Paper", "A cup"],
        reflectionQuestion: "Which part of the cup was hardest to believe as you drew it?",
      },
      {
        day: 3,
        title: "Add the shadow",
        description: "Return to yesterday’s cup and show where the light falls.",
        instructions: [
          "Keep the same cup and light. Redraw the outline lightly.",
          "Shade only the shadow on the table and the dark side of the cup.",
          "Leave the brightest area as untouched paper.",
        ],
        estimatedMinutes: 15,
        materials: ["Pencil", "Paper", "A cup"],
        reflectionQuestion: "Did the shadow make the cup feel heavier, closer, or flatter?",
      },
      {
        day: 4,
        title: "Three poses of your hand",
        description: "Use your own hand as a patient, slightly uncooperative model.",
        instructions: [
          "Draw your non-writing hand in three poses: flat, loosely closed, and pointing.",
          "Spend about four minutes on each pose. Stop before you start polishing.",
          "Look for the large shapes of palm and fingers before the fingernails.",
        ],
        estimatedMinutes: 15,
        materials: ["Pencil", "Paper"],
        reflectionQuestion: "Which pose looked most like your hand, and why?",
      },
      {
        day: 5,
        title: "A plant or a tree",
        description: "Practice seeing a living shape without drawing every leaf.",
        instructions: [
          "Find a houseplant or a tree you can see from where you sit.",
          "Draw the big silhouette first, then add only a few leaf clusters or branches.",
          "Stop at 15 minutes even if the page still looks unfinished.",
        ],
        estimatedMinutes: 15,
        materials: ["Pencil", "Paper"],
        reflectionQuestion: "What did you leave out, and did the drawing still read as a plant?",
      },
      {
        day: 6,
        title: "A face in simple shapes",
        description: "Copy a photo using ovals and angles, not a portrait style.",
        instructions: [
          "Choose a front-facing photo of a person.",
          "Block the head as an oval, then place the eyes halfway down that oval.",
          "Add the nose and mouth as simple angles. Skip hair detail.",
        ],
        estimatedMinutes: 15,
        materials: ["Pencil", "Paper", "A reference photo"],
        reflectionQuestion: "Which feature changed the likeness the most?",
      },
      {
        day: 7,
        title: "Draw anything you want",
        description: "Use the week’s habits on a subject you actually care about.",
        instructions: [
          "Pick one thing you want to draw. Set the timer before you start.",
          "Begin with the big outline, then add light and one area of detail.",
          "Write one sentence on the page about how the sitting felt.",
        ],
        estimatedMinutes: 15,
        materials: ["Pencil", "Paper"],
        reflectionQuestion: "Do you want another week of sketching, or was the curiosity satisfied?",
      },
    ]),
  },
  {
    id: "photography",
    slug: "photography",
    title: "Photography",
    category: "Art",
    description:
      "Train your eye to notice light, edges, and a cleaner frame with the camera you already carry.",
    coverImage: cover("photo-1452587925148-ce544e77e70d"),
    icon: "Camera",
    difficulty: "Beginner",
    durationMinutes: 15,
    challengeTitle: "Seven days of seeing before you shoot",
    challengeDescription: "Learn to see light and framing.",
    outcome:
      "After seven days you can explain why a frame feels calm, crowded, bright, or flat.",
    relatedSlug: "sketching",
    activityMix: { creativity: 3, problemSolving: 2, focus: 3, sensoryAwareness: 5, movement: 1 },
    activities: days([
      {
        day: 1,
        title: "Ten angles of one object",
        description: "Stay with a single subject until the obvious photo is gone.",
        instructions: [
          "Choose one object at home.",
          "Make 10 photos from different heights and distances. Do not change the object.",
          "Pick the frame that surprised you and note what changed: height, distance, or background.",
        ],
        estimatedMinutes: 15,
        materials: ["Phone or camera"],
        reflectionQuestion: "Which angle made the object feel unfamiliar?",
      },
      {
        day: 2,
        title: "Window light only",
        description: "Watch where the shadow starts instead of searching for a filter.",
        instructions: [
          "Turn off extra lamps and stand near a window.",
          "Photograph one subject with the window to the side, then in front of it.",
          "Notice which version keeps detail in both the bright and dark areas.",
        ],
        estimatedMinutes: 15,
        materials: ["Phone or camera", "A window"],
        reflectionQuestion: "Where did the shadow help, and where did it hide the subject?",
      },
      {
        day: 3,
        title: "Off-center on purpose",
        description: "Practice the rule of thirds without turning it into a formula.",
        instructions: [
          "Imagine the frame divided into three columns and three rows.",
          "Make 5 photos with the subject near an intersection, not in the middle.",
          "Make one extra photo with the subject centered, and compare the mood.",
        ],
        estimatedMinutes: 15,
        materials: ["Phone or camera"],
        reflectionQuestion: "Did the empty space feel calm or accidental?",
      },
      {
        day: 4,
        title: "Follow a line",
        description: "Use roads, rails, shelves, or corridors to pull the eye inward.",
        instructions: [
          "Find a line that already exists nearby.",
          "Take 5 photos where that line leads toward something.",
          "Step closer for the last photo so the line becomes the subject.",
        ],
        estimatedMinutes: 15,
        materials: ["Phone or camera"],
        reflectionQuestion: "Did the line point to a subject, or was the line enough?",
      },
      {
        day: 5,
        title: "Textures up close",
        description: "Fill the frame with bark, fabric, food, or a wall.",
        instructions: [
          "Move close enough that the texture reaches every edge.",
          "Take 5 photos of different surfaces.",
          "Check that the most interesting part is sharp.",
        ],
        estimatedMinutes: 15,
        materials: ["Phone or camera"],
        reflectionQuestion: "Which texture still looked interesting without knowing what it was?",
      },
      {
        day: 6,
        title: "A person in soft light",
        description: "Make a simple portrait with the light you practiced on day 2.",
        instructions: [
          "Ask a friend or family member to stand near a window, not in direct sun.",
          "Take a few frames from their eye level. Leave space around the face.",
          "Show them the photo you would actually keep.",
        ],
        estimatedMinutes: 15,
        materials: ["Phone or camera", "A willing person"],
        reflectionQuestion: "What made the person look comfortable or stiff?",
      },
      {
        day: 7,
        title: "Choose your best three",
        description: "Edit the week by deciding, not by adding effects.",
        instructions: [
          "Review the photos from the last six days.",
          "Keep only three. For each, write why it works in one sentence.",
          "Name the habit you want to repeat: angle, light, or framing.",
        ],
        estimatedMinutes: 15,
        materials: ["Phone or camera"],
        reflectionQuestion: "Which of the three would you still show someone next month?",
      },
    ]),
  },
  {
    id: "coding",
    slug: "coding",
    title: "Beginner coding",
    category: "Technology",
    description:
      "Build a tiny program from a greeting, a decision, a loop, and a function.",
    coverImage: cover("photo-1461749280684-dccba630e2f6"),
    icon: "Code",
    difficulty: "Beginner",
    durationMinutes: 15,
    challengeTitle: "Seven days toward a tiny program",
    challengeDescription: "Build your first tiny program.",
    outcome:
      "After seven days you can read a short program and change what it prints, decides, and repeats.",
    relatedSlug: "chess",
    activityMix: { creativity: 2, problemSolving: 5, focus: 4, sensoryAwareness: 2, movement: 1 },
    activities: days([
      {
        day: 1,
        title: "Print a greeting",
        description: "Make the computer say something back.",
        instructions: [
          "Open a free editor such as the browser console, Replit, or any Python playground.",
          "Print exactly Hello.",
          "Change the message to your own greeting and run it again.",
        ],
        estimatedMinutes: 15,
        materials: ["A computer", "A free code editor or browser console"],
        reflectionQuestion: "What did you expect to happen, and what actually printed?",
      },
      {
        day: 2,
        title: "Store your name",
        description: "Put a value in a variable and reuse it.",
        instructions: [
          "Create a variable for your name.",
          "Print a greeting that includes that variable.",
          "Change only the variable and run the program again.",
        ],
        estimatedMinutes: 15,
        materials: ["A computer", "A free code editor"],
        reflectionQuestion: "What became easier once the name lived in one place?",
      },
      {
        day: 3,
        title: "Choose with if and else",
        description: "Teach the program to answer differently based on a number.",
        instructions: [
          "Store an age in a variable.",
          "If the age is 18 or more, print adult. Otherwise print minor.",
          "Test both paths by changing the number.",
        ],
        estimatedMinutes: 15,
        materials: ["A computer", "A free code editor"],
        reflectionQuestion: "Which test case would have slipped through if you had tried only one age?",
      },
      {
        day: 4,
        title: "Count from 1 to 10",
        description: "Use a loop so you do not write the same line ten times.",
        instructions: [
          "Write a loop that prints the numbers 1 through 10.",
          "Change it so the loop stops at 5.",
          "Add one short label, such as the word number, beside each value.",
        ],
        estimatedMinutes: 15,
        materials: ["A computer", "A free code editor"],
        reflectionQuestion: "What would you have to edit if the loop needed to reach 100?",
      },
      {
        day: 5,
        title: "A function that adds",
        description: "Name a small job and call it more than once.",
        instructions: [
          "Write a function that takes two numbers and returns their sum.",
          "Print the result of at least two different calls.",
          "Try a call where one number is 0.",
        ],
        estimatedMinutes: 15,
        materials: ["A computer", "A free code editor"],
        reflectionQuestion: "What is the function responsible for, and what is still your job?",
      },
      {
        day: 6,
        title: "Walk through a list",
        description: "Keep several values together and visit each one.",
        instructions: [
          "Make a list of five foods.",
          "Use a loop to print each food on its own line.",
          "Add one food and confirm the loop prints it without a new print line.",
        ],
        estimatedMinutes: 15,
        materials: ["A computer", "A free code editor"],
        reflectionQuestion: "How is a list different from the single name variable you used on day 2?",
      },
      {
        day: 7,
        title: "A tiny program of your own",
        description: "Combine a variable, a decision, and a function.",
        instructions: [
          "Build a tip calculator or a number guesser. Keep it small enough to finish today.",
          "Use at least one variable, one if statement, and one function.",
          "Run it twice with different inputs and write down one bug or surprise.",
        ],
        estimatedMinutes: 15,
        materials: ["A computer", "A free code editor"],
        reflectionQuestion: "Which part felt like coding, and which part felt like guessing?",
      },
    ]),
  },
  {
    id: "cooking",
    slug: "cooking",
    title: "Cooking",
    category: "Food",
    description:
      "Practice one useful kitchen skill a day until you can cook a simple meal for someone else.",
    coverImage: cover("photo-1556910103-1c02745aae4d"),
    icon: "CookingPot",
    difficulty: "Beginner",
    durationMinutes: 15,
    challengeTitle: "Seven days from knife to a shared plate",
    challengeDescription: "Master one simple dish from scratch.",
    outcome:
      "After seven days you can prep, season, and plate a simple meal without following a long recipe.",
    relatedSlug: "photography",
    activityMix: { creativity: 2, problemSolving: 3, focus: 3, sensoryAwareness: 5, movement: 2 },
    activities: days([
      {
        day: 1,
        title: "Three safe cuts",
        description: "Learn the grip before you chase a recipe.",
        instructions: [
          "Curl the fingertips of your guiding hand and hold a chef’s knife or a sturdy kitchen knife.",
          "Slice an onion, a tomato, and a potato into even pieces. Go slowly.",
          "Stop and reset your grip whenever the knife feels slippery.",
        ],
        estimatedMinutes: 15,
        materials: ["Knife", "Cutting board", "Onion", "Tomato", "Potato"],
        reflectionQuestion: "Which ingredient made you rush, and how did you slow down?",
      },
      {
        day: 2,
        title: "Eggs, timed",
        description: "Cook eggs until you can repeat the result.",
        instructions: [
          "Choose scrambled or boiled eggs.",
          "Time the cook. For scrambled eggs, pull them off while they still look slightly soft.",
          "Salt once at the end and taste.",
        ],
        estimatedMinutes: 15,
        materials: ["Eggs", "Pan or pot", "Salt"],
        reflectionQuestion: "What would you change by 30 seconds next time?",
      },
      {
        day: 3,
        title: "Rice or pasta, measured",
        description: "Get the water and the doneness right on purpose.",
        instructions: [
          "Cook one portion of rice or pasta.",
          "Measure the water or salt the pasta water before it boils.",
          "Taste a minute before you think it is done, then decide.",
        ],
        estimatedMinutes: 15,
        materials: ["Rice or pasta", "Pot", "Salt"],
        reflectionQuestion: "Was the result too firm, too soft, or where you wanted it?",
      },
      {
        day: 4,
        title: "A sauce from the pan",
        description: "Build flavor with oil, onion, tomato, and salt.",
        instructions: [
          "Warm a little oil, then cook chopped onion until it softens.",
          "Add tomato and a pinch of salt. Stir until it looks saucy.",
          "Taste and add salt only if the tomato still tastes flat.",
        ],
        estimatedMinutes: 15,
        materials: ["Oil", "Onion", "Tomato", "Salt", "Pan"],
        reflectionQuestion: "What changed between the first taste and the last?",
      },
      {
        day: 5,
        title: "One vegetable, seasoned as you go",
        description: "Cook a single vegetable and adjust it while it is hot.",
        instructions: [
          "Choose one vegetable you already have.",
          "Cook it simply in a pan or pot with oil or water and salt.",
          "Taste twice: once halfway, once at the end. Change salt or time based on the first taste.",
        ],
        estimatedMinutes: 15,
        materials: ["One vegetable", "Pan or pot", "Salt", "Oil"],
        reflectionQuestion: "Did the second taste need salt, time, or nothing?",
      },
      {
        day: 6,
        title: "A main and a side",
        description: "Put two practiced pieces on one plate.",
        instructions: [
          "Cook one main, such as eggs or a vegetable, and one side, such as rice or a sauce.",
          "Start the slower item first.",
          "Plate them together and eat while they are hot.",
        ],
        estimatedMinutes: 15,
        materials: ["Ingredients from earlier days", "A plate"],
        reflectionQuestion: "What had to wait, and what could be cooked at the same time?",
      },
      {
        day: 7,
        title: "Cook for someone else",
        description: "Repeat your favorite simple dish with another person in mind.",
        instructions: [
          "Choose the dish from this week you would actually serve.",
          "Cook one portion for yourself and one for someone else, or pack the second portion.",
          "Ask what they notice, then write down the one change you trust.",
        ],
        estimatedMinutes: 15,
        materials: ["Ingredients for a simple dish", "A plate"],
        reflectionQuestion: "Did cooking for someone else make you more careful or more tense?",
      },
    ]),
  },
  {
    id: "writing",
    slug: "writing",
    title: "Creative writing",
    category: "Writing",
    description:
      "Find a voice by writing short, specific pieces instead of waiting for a perfect idea.",
    coverImage: cover("photo-1455390582262-044cdead277a"),
    icon: "PenLine",
    difficulty: "Beginner",
    durationMinutes: 15,
    challengeTitle: "Seven days of short, specific pages",
    challengeDescription: "Find your voice in a few lines a day.",
    outcome:
      "After seven days you have a small set of pages and a clearer sense of the tone you like.",
    relatedSlug: "sketching",
    activityMix: { creativity: 5, problemSolving: 3, focus: 4, sensoryAwareness: 3, movement: 1 },
    activities: days([
      {
        day: 1,
        title: "Ten minutes, no editing",
        description: "Write about your day without stopping to fix it.",
        instructions: [
          "Set a timer for 10 minutes.",
          "Write what happened today in the order you remember it.",
          "When the timer ends, change nothing. Read it once aloud.",
        ],
        estimatedMinutes: 15,
        materials: ["Paper or a notes app"],
        reflectionQuestion: "Where did you want to stop and correct a sentence?",
      },
      {
        day: 2,
        title: "A place through five senses",
        description: "Describe somewhere you know without naming how you feel.",
        instructions: [
          "Pick a room, street, or kitchen you know well.",
          "Write one concrete detail for sight, sound, smell, touch, and taste.",
          "Remove any sentence that explains the mood instead of showing it.",
        ],
        estimatedMinutes: 15,
        materials: ["Paper or a notes app"],
        reflectionQuestion: "Which sense made the place easiest to recognize?",
      },
      {
        day: 3,
        title: "A 100-word story",
        description: "Give a tiny story a beginning, a turn, and an ending.",
        instructions: [
          "Write a story in about 100 words.",
          "Include one character, one want, and one change.",
          "Count the words and cut or add until you are close.",
        ],
        estimatedMinutes: 15,
        materials: ["Paper or a notes app"],
        reflectionQuestion: "What did the word limit force you to leave out?",
      },
      {
        day: 4,
        title: "A letter to next year",
        description: "Write to yourself one year from now, plainly.",
        instructions: [
          "Start with what you are curious about this week.",
          "Tell your future self one thing you hope you tried.",
          "Keep it shorter than a page.",
        ],
        estimatedMinutes: 15,
        materials: ["Paper or a notes app"],
        reflectionQuestion: "What did you avoid promising?",
      },
      {
        day: 5,
        title: "The same story, another tone",
        description: "Rewrite yesterday or day 3 so the mood changes.",
        instructions: [
          "Choose an earlier piece.",
          "Rewrite it as funny, sad, or mysterious. Pick one.",
          "Keep the events. Change the word choice and the ending note.",
        ],
        estimatedMinutes: 15,
        materials: ["Paper or a notes app"],
        reflectionQuestion: "Which tone sounded more like you?",
      },
      {
        day: 6,
        title: "A memory that still makes you smile",
        description: "Stay with one scene instead of your whole life story.",
        instructions: [
          "Choose a memory with a clear place and at least one other detail.",
          "Write the scene from the moment you arrived to the moment you left.",
          "Include one line of dialogue or one object you could still point to.",
        ],
        estimatedMinutes: 15,
        materials: ["Paper or a notes app"],
        reflectionQuestion: "What detail appeared that you had not planned to include?",
      },
      {
        day: 7,
        title: "Polish the piece you like",
        description: "Choose one page from the week and make it clearer.",
        instructions: [
          "Pick your favorite piece.",
          "Read it aloud and fix only the sentences that snag.",
          "Give it a title.",
        ],
        estimatedMinutes: 15,
        materials: ["Paper or a notes app"],
        reflectionQuestion: "Do you want to keep writing in this direction?",
      },
    ]),
  },
  {
    id: "chess",
    slug: "chess",
    title: "Chess",
    category: "Games",
    description:
      "Learn the board well enough to play a slow game and notice one of your own mistakes.",
    coverImage: cover("photo-1529699211952-734e80c4d42b"),
    icon: "ChessKnight",
    difficulty: "Beginner",
    durationMinutes: 15,
    challengeTitle: "Seven days to a first thoughtful game",
    challengeDescription: "Learn the pieces, then play slowly enough to see a threat.",
    outcome:
      "After seven days you can set up a board, make legal moves, and review one decision from a real game.",
    relatedSlug: "coding",
    activityMix: { creativity: 1, problemSolving: 5, focus: 5, sensoryAwareness: 2, movement: 1 },
    activities: days([
      {
        day: 1,
        title: "Names and homes",
        description: "Learn what each piece is and where it starts.",
        instructions: [
          "Set up a board, or use a free board such as Lichess.",
          "Place every piece and say its name as you put it down.",
          "Reset the board once from memory and check the back rank.",
        ],
        estimatedMinutes: 15,
        materials: ["Chessboard or a free chess site"],
        reflectionQuestion: "Which piece’s starting square is still easy to mix up?",
      },
      {
        day: 2,
        title: "How each piece moves",
        description: "Move one piece at a time on an empty board.",
        instructions: [
          "Clear the board except for one piece.",
          "Make every legal move that piece has from the center, then from a corner.",
          "Repeat for the knight and the pawn, which break the pattern.",
        ],
        estimatedMinutes: 15,
        materials: ["Chessboard or a free chess site"],
        reflectionQuestion: "Which piece’s move surprised you?",
      },
      {
        day: 3,
        title: "Pawn play",
        description: "Practice captures, blocked pawns, and one promotion idea.",
        instructions: [
          "Set up only pawns.",
          "Practice a capture on the diagonal and a move straight ahead.",
          "Walk one passed pawn to the last rank and promote it to a queen.",
        ],
        estimatedMinutes: 15,
        materials: ["Chessboard or a free chess site"],
        reflectionQuestion: "When did a pawn feel more useful than it looked?",
      },
      {
        day: 4,
        title: "One opening idea",
        description: "Develop pieces toward the center and castle.",
        instructions: [
          "Play the first six moves for both sides.",
          "Move a center pawn, then bring out a knight and a bishop.",
          "Castle on the side that is safe and say why the king moved.",
        ],
        estimatedMinutes: 15,
        materials: ["Chessboard or a free chess site"],
        reflectionQuestion: "Which piece was still sitting at home when you stopped?",
      },
      {
        day: 5,
        title: "A slow ten-minute game",
        description: "Play a complete game against a person or a beginner computer.",
        instructions: [
          "Choose a slow beginner level or a patient friend.",
          "Before each move, name one thing you are threatening or defending.",
          "Resign or play to the end. Save the game if the site lets you.",
        ],
        estimatedMinutes: 15,
        materials: ["Chessboard, friend, or a free chess site"],
        reflectionQuestion: "At what moment did the position stop feeling equal?",
      },
      {
        day: 6,
        title: "Review one mistake",
        description: "Look back at a single move instead of the whole game.",
        instructions: [
          "Find one move from yesterday you regret.",
          "Reset the board to the position just before it.",
          "Try two other legal moves and pick the one that keeps a piece safe.",
        ],
        estimatedMinutes: 15,
        materials: ["Chessboard or a saved game"],
        reflectionQuestion: "What did you see this time that you missed during the game?",
      },
      {
        day: 7,
        title: "Play with one focus",
        description: "Play again while watching only checks, captures, and threats.",
        instructions: [
          "Start a new slow game.",
          "On every turn, look for a check, a capture, and a threat before you move.",
          "After the game, write down whether that checklist changed one decision.",
        ],
        estimatedMinutes: 15,
        materials: ["Chessboard, friend, or a free chess site"],
        reflectionQuestion: "Do you want more chess, or did one game tell you enough?",
      },
    ]),
  },
  {
    id: "guitar",
    slug: "guitar",
    title: "Guitar",
    category: "Music",
    description:
      "Get a guitar in tune and play a small set of open chords slowly enough to hear them.",
    coverImage: cover("photo-1510915361894-db8b60106cb1"),
    icon: "Guitar",
    difficulty: "Beginner",
    durationMinutes: 15,
    challengeTitle: "Seven days to a first chord pattern",
    challengeDescription: "Play your first chords.",
    outcome:
      "After seven days you can tune, fret a few open chords, and strum a slow pattern in time.",
    relatedSlug: "writing",
    activityMix: { creativity: 5, problemSolving: 3, focus: 4, sensoryAwareness: 3, movement: 2 },
    activities: days([
      {
        day: 1,
        title: "Parts, strings, and tuning",
        description: "Learn the instrument in your hands before the chords.",
        instructions: [
          "Name the body, neck, frets, and the six strings from thickest to thinnest: E A D G B E.",
          "Tune with a free tuner app. Pluck one string at a time.",
          "Play each open string and listen for a clean ring.",
        ],
        estimatedMinutes: 15,
        materials: ["Guitar", "Free tuner app"],
        reflectionQuestion: "Which string was hardest to hear clearly?",
      },
      {
        day: 2,
        title: "One finger, one note",
        description: "Press a string cleanly before you try a full chord.",
        instructions: [
          "Press the high E string just behind the first fret with one fingertip.",
          "Pluck it. If it buzzes, move closer to the fret and use less of the fingertip pad.",
          "Repeat on three strings, one minute each, then rest.",
        ],
        estimatedMinutes: 15,
        materials: ["Guitar"],
        reflectionQuestion: "What did a clean note feel like in your finger?",
      },
      {
        day: 3,
        title: "The E minor chord",
        description: "Learn one chord and strum it slowly.",
        instructions: [
          "Place two fingers for Em and check a chord chart if you need the shape.",
          "Pluck each string. Fix any string that sounds muted.",
          "Strum down four times, slowly, and stop if your hand cramps.",
        ],
        estimatedMinutes: 15,
        materials: ["Guitar", "Optional chord chart"],
        reflectionQuestion: "Which string in the chord still buzzed?",
      },
      {
        day: 4,
        title: "Switch between Em and Am",
        description: "Change chords without rushing the next shape.",
        instructions: [
          "Form Am and check that each string rings.",
          "Switch from Em to Am and back for 10 minutes. Speed does not matter.",
          "Count one switch only when both chords sound clean.",
        ],
        estimatedMinutes: 15,
        materials: ["Guitar"],
        reflectionQuestion: "Which finger had to travel the farthest?",
      },
      {
        day: 5,
        title: "Add C and G",
        description: "Learn two more open chords used in countless songs.",
        instructions: [
          "Learn C, then G. Check each string before you strum.",
          "Practice C to G four times, then G to Em four times.",
          "Keep the strum to one downstroke per change.",
        ],
        estimatedMinutes: 15,
        materials: ["Guitar"],
        reflectionQuestion: "Which chord shape felt crowded?",
      },
      {
        day: 6,
        title: "A four-chord pattern",
        description: "Strum G, C, Em, and Am with a slow count.",
        instructions: [
          "Set a slow count of 1, 2, 3, 4.",
          "Play G, C, Em, Am, one chord per count of four.",
          "Loop it three times. If a chord fails, hold it and fix it before continuing.",
        ],
        estimatedMinutes: 15,
        materials: ["Guitar"],
        reflectionQuestion: "Where did the rhythm fall apart?",
      },
      {
        day: 7,
        title: "Play along, slowly",
        description: "Use the pattern with an easy song or a metronome.",
        instructions: [
          "Pick a simple song that uses some of G, C, Em, and Am, or play the pattern alone.",
          "Slow the song down or count aloud.",
          "Play for the time you have left and note which change you want to repeat tomorrow.",
        ],
        estimatedMinutes: 15,
        materials: ["Guitar", "Optional song or metronome"],
        reflectionQuestion: "Did you enjoy the sound enough to keep the guitar out this week?",
      },
    ]),
  },
  {
    id: "yoga",
    slug: "yoga",
    title: "Yoga",
    category: "Movement",
    description:
      "A gentle week of breath, mobility, and balance. Stop any shape that causes pain.",
    coverImage: cover("photo-1544367567-0f2fcb009e0b"),
    icon: "Flower2",
    difficulty: "Beginner",
    durationMinutes: 15,
    challengeTitle: "Seven quiet days on the mat",
    challengeDescription: "Notice your breath while you move.",
    outcome:
      "After seven days you have a short sequence you can repeat and a better sense of your range today.",
    relatedSlug: "sketching",
    activityMix: { creativity: 2, problemSolving: 2, focus: 4, sensoryAwareness: 4, movement: 5 },
    activities: days([
      {
        day: 1,
        title: "Breath you can count",
        description: "Sit and lengthen the exhale before you learn shapes.",
        instructions: [
          "Sit on a chair or the floor with your feet supported.",
          "Breathe in for a count of 4 and out for a count of 4. Continue for 3 minutes.",
          "If counting feels stressful, drop the numbers and simply notice the exhale.",
        ],
        estimatedMinutes: 10,
        materials: ["Comfortable clothes", "Chair or floor space"],
        reflectionQuestion: "Did the longer exhale feel calming or difficult?",
      },
      {
        day: 2,
        title: "Easy seat and a tall spine",
        description: "Find a sitting shape you can keep without forcing your knees.",
        instructions: [
          "Sit cross-legged, or on a cushion, or stay in a chair.",
          "Rest your hands on your thighs and lengthen through the top of your head.",
          "Hold for a minute, shake out your legs, and repeat twice.",
        ],
        estimatedMinutes: 10,
        materials: ["Cushion or chair"],
        reflectionQuestion: "What support did your hips or back need?",
      },
      {
        day: 3,
        title: "Cat and cow",
        description: "Move the spine slowly on hands and knees.",
        instructions: [
          "Come to hands and knees, or do the same rounding and arching while seated.",
          "As you breathe out, round your back. As you breathe in, gently open the chest.",
          "Repeat 8 times. Keep the movement smaller than your maximum.",
        ],
        estimatedMinutes: 10,
        materials: ["Mat or carpet"],
        reflectionQuestion: "Which direction felt more available today?",
      },
      {
        day: 4,
        title: "Arms and breath, standing",
        description: "Pair a simple arm raise with the breath from day 1.",
        instructions: [
          "Stand with feet hip-width apart, or sit if standing is tiring.",
          "Inhale and sweep the arms overhead. Exhale and lower them.",
          "Repeat 8 slow breaths. Soften your shoulders if they creep toward your ears.",
        ],
        estimatedMinutes: 10,
        materials: ["Enough room to lift your arms"],
        reflectionQuestion: "Where did you hold extra effort: jaw, shoulders, or hands?",
      },
      {
        day: 5,
        title: "A small balance",
        description: "Shift your weight and try a supported one-leg stand.",
        instructions: [
          "Stand near a wall or chair you can touch.",
          "Shift weight into one foot and lift the other heel. Hold for 3 breaths.",
          "Switch sides. Use the wall as soon as you wobble. Pain is a reason to stop.",
        ],
        estimatedMinutes: 10,
        materials: ["Wall or chair"],
        reflectionQuestion: "Did looking at a still point make balance easier?",
      },
      {
        day: 6,
        title: "A five-shape flow",
        description: "Link the week into one short sequence.",
        instructions: [
          "Move through easy seat, cat-cow, a standing arm raise, a supported balance, and a forward fold with bent knees.",
          "Take one breath for each movement. Skip any shape that hurts.",
          "Repeat the sequence twice.",
        ],
        estimatedMinutes: 15,
        materials: ["Mat or carpet", "Wall or chair"],
        reflectionQuestion: "Which shape did you want to skip, and did you?",
      },
      {
        day: 7,
        title: "A quiet close",
        description: "Repeat the sequence and finish still.",
        instructions: [
          "Do yesterday’s sequence once.",
          "Lie down or sit and breathe for 3 minutes with the hands resting.",
          "Write one sentence about how your body feels compared with day 1.",
        ],
        estimatedMinutes: 15,
        materials: ["Mat or carpet"],
        reflectionQuestion: "Do you want to keep this as a daily pause?",
      },
    ]),
  },
];

export function getInterest(slug: string) {
  return interests.find((interest) => interest.slug === slug);
}

export function getCategories() {
  return [...new Set(interests.map((interest) => interest.category))];
}

export function getRelatedInterest(interest: Interest) {
  return getInterest(interest.relatedSlug);
}

export function materialsFor(interest: Interest) {
  const seen = new Set<string>();
  const materials: string[] = [];
  for (const activity of interest.activities) {
    for (const material of activity.materials) {
      const key = material.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      materials.push(material);
    }
  }
  return materials;
}

export function getActivity(interest: Interest, day: number) {
  return interest.activities.find((activity) => activity.day === day);
}
