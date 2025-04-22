"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Define our types
export interface Question {
  id: number;
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  timeEstimate: string;
  questions: Question[];
}

// Define the context shape
interface QuizContextType {
  quiz: Quiz | null;
  startQuiz: boolean;
  isAnimating: boolean;
  slideDirection: "left" | "right";
  currentQuestionIndex: number;
  userAnswers: (boolean | null)[];
  showResults: boolean;
  currentQuestion: Question | undefined;
  totalQuestions: number;
  handleAnswer: (answer: boolean) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  resetQuiz: () => void;
  handleStartQuiz: () => void;
  exitQuiz: () => void;
  getQuestionAnimationClass: () => string;
}

// Create context with a default value
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Create a provider component
export const QuizProvider: React.FC<{
  children: ReactNode;
  quiz: Quiz | null;
}> = ({ children, quiz }) => {
  const router = useRouter();
  const [startQuiz, setStartQuiz] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quiz?.questions?.length || 0).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (userAnswers[currentQuestionIndex] === null || !quiz) return;

    setSlideDirection("right");
    setIsAnimating(true);

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
      setIsAnimating(false);
    }, 300);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex <= 0 || !quiz) return;

    setSlideDirection("left");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnimating(false);
    }, 300);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quiz?.questions?.length || 0).fill(null));
    setShowResults(false);
    setStartQuiz(false);
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  const exitQuiz = () => {
    router.push("/online-learning/1");
  };

  const getQuestionAnimationClass = () => {
    if (isAnimating) {
      return slideDirection === "right"
        ? "translate-x-full opacity-0"
        : "-translate-x-full opacity-0";
    }
    return "translate-x-0 opacity-100";
  };

  // Create context value object
  const value: QuizContextType = {
    quiz,
    startQuiz,
    isAnimating,
    slideDirection,
    currentQuestionIndex,
    userAnswers,
    showResults,
    currentQuestion,
    totalQuestions: quiz?.questions?.length || 0,
    handleAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    resetQuiz,
    handleStartQuiz,
    exitQuiz,
    getQuestionAnimationClass,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

// Create a hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
