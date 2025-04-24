"use client";

import Confetti from "@/app/quizzes/_components/Confetti";
import { useEffect, useState } from "react";

export function ProgressConfetti({
  progressPercentage,
}: {
  progressPercentage: number;
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Only show confetti if progress is 100%
    if (progressPercentage === 100) {
      setShowConfetti(true);
    }
  }, [progressPercentage]);

  // Function to replay the confetti animation
  const replayConfetti = () => {
    setShowConfetti(false);
    // Small delay to ensure the component can reset before showing again
    setTimeout(() => setShowConfetti(true), 50);
  };

  // Only show the replay button if progress is 100%
  const showReplayButton = progressPercentage === 100;

  return (
    <>
      <Confetti
        isVisible={showConfetti}
        duration={6000}
        particleCount={150}
        onComplete={() => setShowConfetti(false)}
      />
      {showReplayButton && (
        <button
          onClick={replayConfetti}
          className="fixed bottom-6 right-6 z-50 p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transform transition-transform hover:scale-110 focus:outline-none"
          aria-label="Replay celebration"
          title="Replay celebration"
        >
          <span className="text-2xl">🎉</span>
        </button>
      )}
    </>
  );
}
