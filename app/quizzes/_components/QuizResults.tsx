import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trophy, Star, Home } from "lucide-react";
import { useQuiz } from "./QuizContext";

// Simple confetti component
const Confetti = () => {
  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
    speedX: number;
    speedY: number;
  }
  
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create 100 confetti particles
    const newParticles = [];
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ];

    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // Random x position (0-100%)
        y: -20 - Math.random() * 80, // Start above the viewport
        size: 5 + Math.random() * 10, // Random size
        color: colors[Math.floor(Math.random() * colors.length)], // Random color
        rotation: Math.random() * 360, // Random rotation
        speedX: -2 + Math.random() * 4, // Random horizontal speed
        speedY: 2 + Math.random() * 2, // Random fall speed
      });
    }

    setParticles(newParticles);

    // Animation loop
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed > 5000) {
        // Stop after 5 seconds
        cancelAnimationFrame(animationId);
        return;
      }

      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          y: particle.y + particle.speedY,
          x: particle.x + particle.speedX,
          rotation: particle.rotation + 1,
        }))
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

const QuizResults = () => {
  const { quiz, userAnswers, resetQuiz, exitQuiz } = useQuiz();
  const [showConfetti, setShowConfetti] = useState(false);

  // Start confetti on component mount
  useEffect(() => {
    setShowConfetti(true);

    // Optional: Hide confetti after some time
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Show a simple message if quiz is null
  if (!quiz) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-700">No quiz data available</p>
        <button
          onClick={exitQuiz}
          className="flex items-center mx-auto px-6 py-2 rounded-md text-sm bg-red-800 hover:bg-red-900 text-white font-medium transition duration-300 mt-8"
        >
          <Home className="h-4 w-4 mr-2" />
          Exit Quiz
        </button>
      </div>
    );
  }

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / quiz.questions.length) * 100);
  const passed = score / quiz.questions.length >= 0.7;

  // Setup animation for progress bar
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="mx-auto">
        <div className="mb-8">
          <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight text-red-900 flex items-center mb-8">
            <Trophy className="mr-2 h-10 w-10 text-red-800" />
            Quiz Results
          </h2>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md mb-8 border border-gray-100">
          <p className="scroll-m-20 text-2xl font-semibold tracking-tight text-red-900 mb-2">
            Your Score: {score}/{quiz.questions.length}
          </p>
          <p className="text-xl text-gray-700 mb-4">{percentage}%</p>
          {/* Bubbly progress bar - Fixed to prevent star cropping */}
          <div className="w-full bg-gray-200 rounded-full h-6 mb-6 relative p-1">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-red-600 to-red-800 transition-all duration-1000 ease-out flex items-center overflow-hidden"
              style={{
                width: animate ? `${percentage}%` : "0%",
                boxShadow: "0 0 10px rgba(220, 38, 38, 0.5)",
              }}
            >
              {/* Bubbles inside progress bar */}
              <div className="absolute inset-0">
                <div className="bubble-effect w-full h-full opacity-50"></div>
              </div>
            </div>

            {/* Star at the end of progress - Fixed positioning */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out z-10"
              style={{ left: animate ? `${percentage}%` : "0%" }}
            >
              <Star className="h-10 w-10 text-yellow-400 fill-yellow-400 filter drop-shadow-md -ml-5" />
            </div>
          </div>

          {/* CSS for bubble animation */}
          <style jsx>{`
            .bubble-effect {
              background-image:
                radial-gradient(
                  circle,
                  rgba(255, 255, 255, 0.3) 10%,
                  transparent 10%
                ),
                radial-gradient(
                  circle,
                  rgba(255, 255, 255, 0.3) 10%,
                  transparent 10%
                );
              background-size: 30px 30px;
              background-position:
                0 0,
                15px 15px;
              animation: bubbleFloat 2s linear infinite;
            }

            @keyframes bubbleFloat {
              0% {
                background-position:
                  0 0,
                  15px 15px;
              }
              100% {
                background-position:
                  30px 30px,
                  45px 45px;
              }
            }
          `}</style>
          {passed ? (
            <p className="text-red-800 font-medium flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
              Great job! You passed the quiz!
            </p>
          ) : (
            <p className="text-red-800 font-medium leading-6 mt-2">
              Try again next time!
            </p>
          )}
        </div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-red-900 mb-4">
          Question Review:
        </h3>
        {quiz.questions.map((question, index) => (
          <div
            key={question.id}
            className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                {userAnswers[index] === question.correctAnswer ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-700">{question.question}</p>
                <p className="text-sm mt-1">
                  Your answer:{" "}
                  {userAnswers[index] === true
                    ? "True"
                    : userAnswers[index] === false
                      ? "False"
                      : "Not answered"}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Correct answer: {question.correctAnswer ? "True" : "False"}
                </p>
                <p className="text-sm text-gray-600 leading-6 mt-2">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-row gap-4 justify-center mt-8">
          <button
            onClick={resetQuiz}
            className="flex items-center justify-center px-6 py-2 rounded-md text-sm font-medium transition duration-300 bg-white border-2 border-red-800 text-red-800 hover:bg-red-50"
          >
            Retake Quiz
          </button>
          <button
            onClick={exitQuiz}
            className="flex items-center justify-center px-6 py-2 rounded-md text-sm font-medium transition duration-300 bg-red-800 hover:bg-red-900 text-white"
          >
            <Home className="h-4 w-4 mr-2" />
            Exit Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizResults;
