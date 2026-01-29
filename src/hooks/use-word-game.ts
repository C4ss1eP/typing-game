// hooks/use-word-game.ts
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getRandomWords, Difficulty } from "@/lib/words";

interface UseWordGameProps {
  wordCount: number;
  difficulty: Difficulty;
}

export function useWordGame({ wordCount, difficulty }: UseWordGameProps) {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [input, setInput] = useState("");
  const [showWin, setShowWin] = useState(false);

  const wordDisplayViewportRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [translateY, setTranslateY] = useState<number>(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [initialTransformSet, setInitialTransformSet] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Generate words on mount or when wordCount/difficulty changes
  useEffect(() => {
    setWords(getRandomWords(wordCount, difficulty));
    setCurrentWordIdx(0);
    setInput("");
    setShowWin(false);
    wordRefs.current = wordRefs.current.slice(0, wordCount);
    setIsInitialRender(true);
    setInitialTransformSet(false);
    setTranslateY(0);
  }, [wordCount, difficulty]);

  // useLayoutEffect for DOM measurements to center current word
  useLayoutEffect(() => {
    const viewport = wordDisplayViewportRef.current;
    const currentWordEl = wordRefs.current[currentWordIdx];

    if (!viewport || !currentWordEl) {
      return;
    }

    const viewportHeight = viewport.offsetHeight;
    let currentWordNaturalTop = 0;
    const fixedGap = 30; // Matches marginBottom set in WordDisplay

    for (let i = 0; i < currentWordIdx; i++) {
      const wordEl = wordRefs.current[i];
      if (wordEl) {
        currentWordNaturalTop += wordEl.offsetHeight;
        currentWordNaturalTop += fixedGap;
      }
    }

    const desiredCenterInViewport = viewportHeight / 2;
    const currentWordNaturalCenter = currentWordNaturalTop + (currentWordEl.offsetHeight / 2);

    const newTranslateY = desiredCenterInViewport - currentWordNaturalCenter;
    setTranslateY(newTranslateY);

    if (isInitialRender) {
      setIsInitialRender(false);
    }
    if (!initialTransformSet) {
      setInitialTransformSet(true);
    }
  }, [currentWordIdx, words, initialTransformSet, isInitialRender]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // Dont allow input if game is complete
    if (gameComplete) return;

    const value = e.target.value;
    setInput(value);

    const currentWord = words[currentWordIdx] || "";

    if (value === currentWord) {
      setTimeout(() => {
        if (currentWordIdx + 1 >= words.length) {
          // Game is complete
          setGameComplete(true);
          
          // Then show the win popup after a delay (to allow progress bar animation)
          setTimeout(() => {
            setShowWin(true);
          }, 500); // Slightly longer than the progress bar transition
        } else {
          setCurrentWordIdx(idx => idx + 1);
        }
        setInput("");
      }, 300); // Small delay to show green highlight
    }
  };

  const resetGame = () => {
    setWords(getRandomWords(wordCount, difficulty));
    setCurrentWordIdx(0);
    setInput("");
    setShowWin(false);
    setGameComplete(false);
    setIsInitialRender(true);
    setInitialTransformSet(false);
    setTranslateY(0);
  };

  return {
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
  };
}