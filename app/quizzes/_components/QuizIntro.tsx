"use client";
import React from "react";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";

const QuizIntro = () => {
  const { quiz, handleStartQuiz } = useQuiz();

  // If quiz is null, show a loading state
  if (!quiz) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-700">Loading quiz...</p>
      </div>
    );
  }

  // Badge classes
  const badgeClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-fit";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
      <div className="order-2 lg:order-1 space-y-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900">
          {quiz.title}
        </h1>
        <p className="leading-7 text-xl text-gray-700 [&:not(:first-child)]:mt-6">
          {quiz.description}
        </p>
        <div className="pt-4 flex flex-col gap-5">
          <span className={`${badgeClasses} bg-green-100 text-green-800`}>
            <BookOpen className="mr-1 h-4 w-4" />
            {quiz.questions.length} Questions
          </span>
          <span className={`${badgeClasses} bg-red-100 text-red-800`}>
            <Clock className="h-4 w-4 mr-1" />
            Estimated Time: {quiz.timeEstimate}
          </span>

          <button
            onClick={handleStartQuiz}
            className="mt-4 bg-red-800 hover:bg-red-900 text-white font-medium py-2 px-4 rounded-md transition duration-300 text-sm w-1/3 text-center"
          >
            Start Quiz
          </button>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <Image
          src="/double1.jpeg"
          width={600}
          height={600}
          alt="Quiz featured image"
          className="rounded-2xl shadow-2xl w-full h-100 object-cover"
        />
      </div>
    </div>
  );
};

export default QuizIntro;
