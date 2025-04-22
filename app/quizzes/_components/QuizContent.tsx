"use client";
import React from "react";
import { useQuiz } from "./QuizContext";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";

const QuizContent = () => {
  const { startQuiz, showResults } = useQuiz();

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      {!startQuiz && <QuizIntro />}

      {startQuiz && (
        <div id="quiz-questions" className="mt-8 scroll-mt-8">
          {showResults ? <QuizResults /> : <QuizQuestion />}
        </div>
      )}
    </div>
  );
};

export default QuizContent;
