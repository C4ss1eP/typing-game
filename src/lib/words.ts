// lib/words.ts
// Word list structured by difficulty levels
export const DIFFICULTY_WORDS = {
  Easy: [
    "cat", "dog", "run", "jump", "ball", "hat", "sun", "moon", "star", "tree",
    "box", "key", "pen", "cup", "book", "desk", "door", "walk", "sing", "play"
  ],
  Medium: [
    "apple", "banana", "orange", "grape", "house", "garden", "flower", "water", "river", "cloud",
    "happy", "sad", "clever", "brave", "quiet", "dream", "learn", "write", "speak", "music",
    "pixel", "react", "game", "code", "type", "speed", "input", "output", "logic", "state"
  ],
  Hard: [
    "xylophone", "juxtapose", "paradigm", "rhythm", "pneumonia", "labyrinth", "ephemeral", "ubiquitous",
    "serendipity", "melancholy", "gregarious", "eloquence", "benevolent", "cacophony", "equanimity",
    "magnanimous", "obfuscate", "perseverance", "quintessential", "reverberate", "algorithm", "variable"
  ]
};

// Define and export the Difficulty type based on the keys of DIFFICULTY_WORDS
export type Difficulty = keyof typeof DIFFICULTY_WORDS;

// Helper to get a random list of words based on count and difficulty
export function getRandomWords(count: number, difficulty: Difficulty) {
  const wordList = DIFFICULTY_WORDS[difficulty];
  if (!wordList) return [];

  // Ensure count doesn't exceed available words for the difficulty
  const effectiveCount = Math.min(count, wordList.length);

  const shuffled = [...wordList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, effectiveCount);
}