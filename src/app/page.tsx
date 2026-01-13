"use client";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import MainMenu from "./MainMenu";


// Simple random word generator
const WORDS = [
  "pixel", "react", "game", "code", "type", "speed", "input", "output", "logic", "state",
  "array", "props", "style", "focus", "event", "random", "track", "color", "green", "yellow"
];

function getRandomWords(count: number) {
  const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Home() {

  // Add a screen state
  const [screen, setScreen] = useState<"menu" | "game" | "settings" | "quit">("menu");

  // Settings state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [wordCount, setWordCount] = useState(5);
  const [highlightColor, setHighlightColor] = useState("#ffffff"); // yellow-400
  const [rightColor, setRightColor] = useState("#fde047"); // yellow-400 (for correct letters as you type)
  const [wrongColor, setWrongColor] = useState("#f87171"); // red-400
  const [completedWordColor, setCompletedWordColor] = useState("#22c55e"); // green-500 (for completed word)

  // Sidebar width and duration (keep in sync with sidebar style)
  const SIDEBAR_WIDTH = 320;
  const [slideDuration, setSlideDuration] = useState(700); // duration in ms

  // Game state
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [input, setInput] = useState("");
  const [showWin, setShowWin] = useState(false);

  // Generate words on mount or when wordCount changes
  useEffect(() => {
    setWords(getRandomWords(wordCount));
    setCurrentWordIdx(0);
    setInput("");
    setShowWin(false);
  }, [wordCount]);

  // Reset handler
  const handleReset = () => {
    setWords(getRandomWords(wordCount));
    setCurrentWordIdx(0);
    setInput("");
    setShowWin(false);
  };

  const currentWord = words[currentWordIdx] || "";

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // If word completed
    if (value === currentWord) {
      setTimeout(() => {
        if (currentWordIdx + 1 >= words.length) {
          setShowWin(true); // Show popup if last word
        } else {
          setCurrentWordIdx(idx => idx + 1);
        }
        setInput("");
      }, 300); // Small delay to show green highlight
    }
  };

  // Render words with highlighting
  const renderWords = () => {
    return words.map((word, idx) => {
      // Current word: highlight letters
      if (idx === currentWordIdx) {
        // If the word is completed, make all letters green
        if (input === word) {
          return (
            <span key={idx} className="mr-4">
              <span className="text-green-400">
                {word.split("").map((char, i) => (
                  <span key={i}>{char}</span>
                ))}
              </span>
            </span>
          );
        }
        // Otherwise, highlight correct letters, wrong, rest
        return (
          <span key={idx} className="mr-4">
            {word.split("").map((char, i) => {
              let color = highlightColor;
              if (input[i] === char) color = rightColor;
              else if (input[i] && input[i] !== char) color = wrongColor;
              return (
                <span key={i} style={{ color }}>
                  {char}
                </span>
              );
            })}
          </span>
        );
      }
      // Completed words: green
      if (idx < currentWordIdx) {
        return (
          <span key={idx} className="mr-4" style={{ color: completedWordColor }}>
            {word}
          </span>
        );
      }
      // Upcoming words: gray
      return (
        <span key={idx} className="mr-4 text-gray-500">
          {word}
        </span>
      );
    });
  };

  // Settings Sidebar
  const SettingsSidebar = (
    <div
      className={`fixed top-0 left-0 h-full z-50 bg-black border-r-2 border-white shadow-lg transition-transform ease-in-out`}
      style={{
        width: SIDEBAR_WIDTH,
        transitionDuration: `${slideDuration}ms`,
        transform: "translateX(0)"
      }}
    >
      <div className="flex flex-col h-full p-6 gap-6">
        {/* Back to Menu Button */}
        <div>
          <button
            onClick={() => setScreen("menu")}
            className="bg-gray-800 text-white px-4 py-2 rounded shadow font-mono mb-2 hover:bg-gray-700 transition-all"
          >
            Back to Menu
          </button>
        </div>
        {/* Word Count */}
        <div>
          <label className="block text-white mb-1 font-mono">Word Count</label>
          <input
            type="number"
            min={1}
            max={WORDS.length}
            value={wordCount}
            onChange={e => setWordCount(Number(e.target.value))}
            className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 font-mono"
          />
        </div>
        {/* Highlight Color */}
        <div>
          <label className="block text-white mb-1 font-mono">Highlight Color</label>
          <input
            type="color"
            value={highlightColor}
            onChange={e => setHighlightColor(e.target.value)}
            className="w-10 h-10 p-0 border-none bg-transparent"
          />
        </div>
        {/* Right Letter Color */}
        <div>
          <label className="block text-white mb-1 font-mono">Right Letter Color</label>
          <input
            type="color"
            value={rightColor}
            onChange={e => setRightColor(e.target.value)}
            className="w-10 h-10 p-0 border-none bg-transparent"
          />
        </div>
        {/* Completed Word Color */}
        <div>
          <label className="block text-white mb-1 font-mono">Completed Word Color</label>
          <input
            type="color"
            value={completedWordColor}
            onChange={e => setCompletedWordColor(e.target.value)}
            className="w-10 h-10 p-0 border-none bg-transparent"
          />
        </div>
        {/* Wrong Letter Color */}
        <div>
          <label className="block text-white mb-1 font-mono">Wrong Letter Color</label>
          <input
            type="color"
            value={wrongColor}
            onChange={e => setWrongColor(e.target.value)}
            className="w-10 h-10 p-0 border-none bg-transparent"
          />
        </div>
        {/* Slide Duration */}
        <div>
          <label className="block text-white mb-1 font-mono">Slide Duration (ms)</label>
          <input
            type="number"
            min={100}
            max={3000}
            value={slideDuration}
            onChange={e => setSlideDuration(Number(e.target.value))}
            className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 font-mono"
          />
        </div>
      </div>
    </div>
  );

  // --- MAIN RENDER LOGIC ---
  if (screen === "menu") {
    return (
      <MainMenu
        onPlay={() => setScreen("game")}
        onSettings={() => setScreen("settings")}
        onQuit={() => setScreen("quit")}
      />
    );
  }

  // --- Settings Screen ---
  if (screen === "settings") {
    return SettingsSidebar;
  }

  // --- Quit Screen ---
  if (screen === "quit") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono text-2xl">
        Thanks for playing!
      </div>
    );
  }

  // --- GAME SCREEN ---

  return (
    <main className="min-h-screen flex flex-row items-center justify-center bg-black relative overflow-x-hidden">
      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center w-full transition-all"
        style={{
          marginLeft: settingsOpen ? SIDEBAR_WIDTH : 0,
          transitionDuration: `${slideDuration}ms`,
        }}
      >
        <div className="flex flex-row justify-center gap-x-8 mb-6">
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-all font-mono"
          >
            Reset Words
          </button>
          <button
            onClick={() => setScreen("menu")}
            className="bg-gray-800 text-white px-4 py-2 rounded shadow font-mono"
          >
            Back to Menu
          </button>
        </div>
        <h1 className="m-[10px] flex flex-col items-center border-4 border-white rounded-lg shadow-[8px_8px_0_0_#ff0000] bg-black p-8 max-w-xl w-full"
          style={{
            fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', monospace",
            imageRendering: "pixelated",
          }}>
          Cassie&apos;s Typing Game
        </h1>
        <div className="w-[80%] h-[60vh] m-[10px] bg-black text-white border-2 border-red-600 rounded px-4 py-6 text-lg tracking-widest select-none font-mono shadow-[4px_4px_0_0_#ff0000]"
          style={{ letterSpacing: "2px" }}>
          {renderWords()}
        </div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="
            w-[80%]
            m-[10px]
            bg-black text-white
            border-2 border-red-600 rounded
            px-4 py-3
            text-lg
            tracking-widest
            font-mono
            outline-none
            shadow-[2px_2px_0_0_#ff0000]
            placeholder:text-red-400
            focus:border-white
            focus:shadow-[2px_2px_0_0_#fff]
            transition-all
          "
          placeholder="Type here..."
          style={{
            fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', monospace",
            letterSpacing: "2px",
            imageRendering: "pixelated",
          }}
          autoFocus
          autoComplete="off"
        />
      </div>
      {/* POPUP MODAL */}
      {showWin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
          {typeof window !== "undefined" && (
            <>
              <Confetti
                numberOfPieces={150}
                recycle={false}
                gravity={0.25}
                initialVelocityY={10}
                width={window.innerWidth}
                height={window.innerHeight}
              />
            </>
          )}
          <div className="bg-black text-white rounded-lg shadow-lg p-8 flex flex-col items-center border-2 border-white">
            <h2 className="text-3xl font-bold mb-4">You Won!</h2>
            <button
              onClick={handleReset}
              className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition-all font-mono"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}