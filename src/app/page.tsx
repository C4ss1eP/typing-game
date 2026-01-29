// M:\typing-game\src\app\page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Confetti from "react-confetti";
import { WordDisplay } from "@/components/word-display";
import { SettingsSidebar } from "@/components/settings-sidebar";
import MainMenu from "@/components/MainMenu";
import { useWordGame } from "@/hooks/use-word-game";
import { Difficulty } from "@/lib/words";

export default function Home() {
  const [screen, setScreen] = useState<"menu" | "settings" | "game" | "quit">("menu");

  // Settings state
  const [wordCount, setWordCount] = useState(5);
  const [highlightColor, setHighlightColor] = useState("#ffffff");
  const [rightColor, setRightColor] = useState("#fde047");
  const [wrongColor, setWrongColor] = useState("#f87171");
  const [completedWordColor, setCompletedWordColor] = useState("#22c55e");
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [slideDuration, setSlideDuration] = useState(500);

  // Use the custom hook for game logic
  const {
    words,
    currentWordIdx,
    input,
    showWin,
    gameComplete,
    translateY,
    isInitialRender,
    initialTransformSet,
    wordRefs,
    wordDisplayViewportRef,
    handleInputChange,
    resetGame,
  } = useWordGame({ wordCount, difficulty });

  // Main Render Logic
  if (screen === "menu") {
    return (
      <MainMenu
        onPlay={() => setScreen("game")}
        onSettings={() => setScreen("settings")}
        onQuit={() => setScreen("quit")}
      />
    );
  }

  if (screen === "settings") {
    return (
      <SettingsSidebar
        setScreen={setScreen}
        wordCount={wordCount}
        setWordCount={setWordCount}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
        rightColor={rightColor}
        setRightColor={setRightColor}
        wrongColor={wrongColor}
        setWrongColor={setWrongColor}
        completedWordColor={completedWordColor}
        setCompletedWordColor={setCompletedWordColor}
        slideDuration={slideDuration}
        setSlideDuration={setSlideDuration}
      />
    );
  }

  if (screen === "quit") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono text-2xl">
        Thanks for playing!
      </div>
    );
  }

  // Game Screen
  return (
    <main className="min-h-screen flex flex-row items-center justify-center bg-black relative overflow-x-hidden">
      <div className="flex flex-col items-center justify-center w-full transition-all">
        <div className="flex flex-row justify-center gap-x-8 mb-6">
          <button
            onClick={resetGame}
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
        
        {/* Ghost representation */}
        <div className="w-[40%] aspect-[16/9] relative mb-6 shadow-[4px_4px_0_0_#000000]">
          <Image 
            src="/media/ghost_01.png" 
            alt="Ghost character" 
            fill
            style={{ objectFit: 'contain' }}
            className="p-4"
          />
        </div>

        {/* Progress Bar */}
        <div className="w-[40%] relative">
          <div className="w-full h-10 border-4 border-white bg-red-600 relative">
            <div 
              className={`h-full bg-black transition-all duration-300 absolute right-0 top-0 ${
                gameComplete ? 'animate-pulse' : ''
              }`}
              style={{ 
                width: `${Math.min(100, (currentWordIdx * Math.floor(100 / words.length)))}%` 
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-mono font-bold">
              {currentWordIdx}/{words.length}
            </div>
          </div>
        </div>

        {/* Viewport for the words */}
        <div
          ref={wordDisplayViewportRef}
          className="w-[40%] aspect-[16/9] m-[10px] bg-black text-white border-2 border-red-600 rounded p-0 overflow-hidden shadow-[4px_4px_0_0_#ff0000] relative"
        >
        <WordDisplay
          words={words}
          currentWordIdx={currentWordIdx}
          input={input}
          highlightColor={highlightColor}
          rightColor={rightColor}
          wrongColor={wrongColor}
          completedWordColor={completedWordColor}
          translateY={translateY}
          isInitialRender={isInitialRender}
          initialTransformSet={initialTransformSet}
          wordRefs={wordRefs}
          slideDuration={slideDuration}
        />
        </div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={gameComplete} // Disable the input when game is complete
          className={`
            w-[40%]
            m-[10px]
            bg-black text-white
            border-2 ${gameComplete ? 'border-green-600' : 'border-red-600'} rounded
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
            ${gameComplete ? 'cursor-not-allowed' : ''}
          `}
          placeholder={gameComplete ? "Game Complete!" : "Type here..."}
          style={{
            fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', monospace",
            letterSpacing: "2px",
            imageRendering: "pixelated",
          }}
          autoFocus
          autoComplete="off"
        />
      </div>
      
      {/* Win Popup Modal */}
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
              onClick={resetGame}
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