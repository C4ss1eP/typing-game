// src/app/page.tsx
"use client";
import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="
          m-[10px]
          flex flex-col items-center
          border-4 border-white rounded-lg
          shadow-[8px_8px_0_0_#ff0000]
          bg-black
          p-8
          max-w-xl w-full
        "
        style={{
          fontFamily: "'Press Start 2P', 'VT323', 'Fira Mono', monospace",
          imageRendering: "pixelated",
        }}>Typing Live Printing
      </h1>
      <div className="
            w-[80%]
            h-[60vh]
            m-[10px]
            bg-black text-white
            border-2 border-red-600 rounded
            px-4 py-6
            text-lg
            tracking-widest
            select-none
            font-mono
            shadow-[4px_4px_0_0_#ff0000]
          "
          style={{ letterSpacing: "2px" }}>
        <span className="text-gray-700">{input}</span>
      </div>
      <input
        type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
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
      />
    </main>
  );
}