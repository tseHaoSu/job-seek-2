"use client";
import React from "react";
import { QuizProvider, Quiz } from "./QuizContext";
import QuizContent from "./QuizContent";

export interface TrueFalseQuizProps {
  quiz: Quiz;
}

const TrueFalseQuiz = ({ quiz }: TrueFalseQuizProps) => {
  if (!quiz) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-700">Loading quiz data...</p>
      </div>
    );
  }

  return (
    <QuizProvider quiz={quiz}>
      <QuizContent />
    </QuizProvider>
  );
};

export default TrueFalseQuiz;
