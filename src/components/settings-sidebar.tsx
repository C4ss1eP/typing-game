"use client";

import React from 'react';
import { Difficulty, DIFFICULTY_WORDS } from '@/lib/words';

interface SettingsSidebarProps {
  setScreen: (screen: "menu" | "settings" | "game" | "quit") => void;
  wordCount: number;
  setWordCount: (count: number) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  highlightColor: string;
  setHighlightColor: (color: string) => void;
  rightColor: string;
  setRightColor: (color: string) => void;
  wrongColor: string;
  setWrongColor: (color: string) => void;
  completedWordColor: string;
  setCompletedWordColor: (color: string) => void;
  slideDuration: number;
  setSlideDuration: (duration: number) => void;
}

export function SettingsSidebar({
  setScreen,
  wordCount,
  setWordCount,
  difficulty,
  setDifficulty,
  highlightColor,
  setHighlightColor,
  rightColor,
  setRightColor,
  wrongColor,
  setWrongColor,
  completedWordColor,
  setCompletedWordColor,
  slideDuration,
  setSlideDuration
}: SettingsSidebarProps) {

  // A reasonable upper limit for the number of words input.
  // The actual number of words generated will be handled by the game logic based on difficulty.
  const maxWordCountInput = 20; 

  return (
    <div className="fixed top-0 left-0 h-full w-full md:w-1/3 lg:w-1/4 xl:w-1/5 z-50 bg-black border-r-2 border-white shadow-lg transition-transform ease-in-out p-6 flex flex-col gap-6 overflow-y-auto">
      <h2 className="text-3xl font-bold text-white mb-4 font-mono">Settings</h2>

      {/* Difficulty Selection */}
      <div>
        <label htmlFor="difficulty" className="block text-white mb-1 font-mono">Difficulty</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 font-mono"
        >
          {/* Options dynamically generated from the DIFFICULTY_WORDS keys */}
          {Object.keys(DIFFICULTY_WORDS).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Word Count Input */}
      <div>
        <label htmlFor="wordCount" className="block text-white mb-1 font-mono">Number of Words</label>
        <input
          id="wordCount"
          type="number"
          min={1}
          max={maxWordCountInput}
          value={wordCount}
          onChange={e => setWordCount(Number(e.target.value))}
          className="w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 font-mono"
        />
      </div>

      {/* Highlight Color Picker (for untyped letters) */}
      <div>
        <label htmlFor="highlightColor" className="block text-white mb-1 font-mono">Highlight Color (Untyped)</label>
        <input
          id="highlightColor"
          type="color"
          value={highlightColor}
          onChange={e => setHighlightColor(e.target.value)}
          className="w-10 h-10 p-0 border-none bg-transparent rounded-md overflow-hidden cursor-pointer"
        />
      </div>

      {/* Right Letter Color Picker */}
      <div>
        <label htmlFor="rightColor" className="block text-white mb-1 font-mono">Right Letter Color</label>
        <input
          id="rightColor"
          type="color"
          value={rightColor}
          onChange={e => setRightColor(e.target.value)}
          className="w-10 h-10 p-0 border-none bg-transparent rounded-md overflow-hidden cursor-pointer"
        />
      </div>

      {/* Wrong Letter Color Picker */}
      <div>
        <label htmlFor="wrongColor" className="block text-white mb-1 font-mono">Wrong Letter Color</label>
        <input
          id="wrongColor"
          type="color"
          value={wrongColor}
          onChange={e => setWrongColor(e.target.value)}
          className="w-10 h-10 p-0 border-none bg-transparent rounded-md overflow-hidden cursor-pointer"
        />
      </div>

      {/* Completed Word Color Picker */}
      <div>
        <label htmlFor="completedWordColor" className="block text-white mb-1 font-mono">Completed Word Color</label>
        <input
          id="completedWordColor"
          type="color"
          value={completedWordColor}
          onChange={e => setCompletedWordColor(e.target.value)}
          className="w-10 h-10 p-0 border-none bg-transparent rounded-md overflow-hidden cursor-pointer"
        />
      </div>

      {/* Slide Duration Slider */}
      <div>
        <label htmlFor="slideDuration" className="block text-white mb-1 font-mono">Slide Duration (ms)</label>
        <input
          id="slideDuration"
          type="range"
          min={100}
          max={1000}
          step={50}
          value={slideDuration}
          onChange={e => setSlideDuration(Number(e.target.value))}
          className="w-full bg-gray-800 text-white accent-white"
        />
        <div className="text-white text-center">{slideDuration}ms</div>
      </div>

      <div>
        <button
          onClick={() => setScreen("menu")}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow font-mono mb-2 hover:bg-gray-700 transition-all"
        >
        Back to Menu
        </button>
      </div>
    </div>
  );
}