"use client";
import React from "react";

type MainMenuProps = {
  onPlay: () => void;
  onSettings: () => void;
  onQuit: () => void;
};

export default function MainMenu({ onPlay, onSettings, onQuit }: MainMenuProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-4xl font-mono text-white mb-12 border-4 border-white rounded-lg p-8 shadow-[8px_8px_0_0_#ff0000] bg-black">
        Cassie&apos;s Typing Game
      </h1>
      <div className="flex flex-col gap-6 w-64">
        <button
          onClick={onPlay}
          className="bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-700 font-mono text-xl transition-all"
        >
          Play
        </button>
        <button
          onClick={onSettings}
          className="bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-700 font-mono text-xl transition-all"
        >
          Settings
        </button>
        <button
          onClick={onQuit}
          className="bg-black text-red-400 border-2 border-red-600 px-6 py-3 rounded shadow font-mono text-xl hover:bg-red-900 transition-all"
        >
          Quit
        </button>
      </div>
    </div>
  );
}