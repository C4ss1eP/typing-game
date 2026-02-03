// M:\typing-game\src\components\word-display.tsx
import React from "react";

interface WordDisplayProps {
  words: string[];
  currentWordIdx: number;
  input: string;
  highlightColor: string;
  rightColor: string;
  wrongColor: string;
  completedWordColor: string; // The prop is defined here
  translateY: number;
  isInitialRender: boolean;
  initialTransformSet: boolean;
  wordRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  slideDuration: number;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  words,
  currentWordIdx,
  input,
  highlightColor,
  rightColor,
  wrongColor,
  completedWordColor, // And destructured here
  translateY,
  isInitialRender,
  initialTransformSet,
  wordRefs,
  slideDuration,
}) => {
  // Modify transformStyle in WordDisplay component
  const transformStyle = initialTransformSet
    ? `translateY(${translateY}px)`
    : `translateY(25%)`; // Start in middle of viewport rather than top

  return (
    <div
      className={`absolute top-0 left-0 w-full flex flex-col items-center
                  ${isInitialRender ? '' : 'transition-transform ease-out'}`}
      style={{
        transform: transformStyle,
        transitionDuration: `${slideDuration}ms`
      }}
    >
      {words.map((word, index) => {
        let fontSizeClass = "";
        let opacityClass = "";
        let dynamicColorStyle: React.CSSProperties = {}; // For inline style (e.g., hex colors)
        let tailwindTextColorClass = ""; // For Tailwind classes (e.g., "text-gray-500")

        const customStyle: React.CSSProperties = {
          marginBottom: '30px'
        };

        if (index < currentWordIdx) { // All previously completed words
          fontSizeClass = "text-7xl";
          dynamicColorStyle = { color: completedWordColor }; // <--- Use completedWordColor here
          opacityClass = "opacity-100";
        } else if (index === currentWordIdx) { // Current word
          fontSizeClass = "text-8xl";
          // Colors for the current word are handled character by character below,
          // so no default full-word color class or style is applied here.
          opacityClass = "opacity-100";
        } else if (index === currentWordIdx + 1) { // Next word
          fontSizeClass = "text-7xl";
          tailwindTextColorClass = "text-gray-500";
          opacityClass = "opacity-50";
        } else { // Far away words: hide visually but maintain layout space for measurement
          opacityClass = "opacity-0 invisible";
          tailwindTextColorClass = "text-white"; // Default for hidden words, though not visible
        }

        // Render current word character-by-character for individual highlighting
        if (index === currentWordIdx) {
          return (
            <span key={word + index}
                  ref={el => { wordRefs.current[index] = el; }}
                  className={`flex justify-center font-mono ${fontSizeClass} ${opacityClass}`}
                  style={customStyle}>
              {word.split("").map((char, i) => {
                let charColor = highlightColor; // Default for untyped chars in current word
                if (input[i] === char) charColor = rightColor;
                else if (input[i] && input[i] !== char) charColor = wrongColor;
                return (
                  <span key={i} style={{ color: charColor }}>
                    {char}
                  </span>
                );
              })}
            </span>
          );
        } else {
          // Render other words as a single span
          return (
            <span
              key={word + index}
              ref={el => { wordRefs.current[index] = el; }}
              className={`block text-center font-mono ${fontSizeClass} ${tailwindTextColorClass} ${opacityClass}`}
              style={{ ...customStyle, ...dynamicColorStyle }} // Apply dynamic inline color
            >
              {word}
            </span>
          );
        }
      })}
    </div>
  );
};