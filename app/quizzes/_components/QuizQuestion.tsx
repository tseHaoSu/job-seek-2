import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Home, Check, X, Star } from "lucide-react";
import Image from "next/image";
import { useQuiz } from "./QuizContext";

const QuizQuestion = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    userAnswers,
    handleAnswer,
    goToPreviousQuestion,
    goToNextQuestion,
    exitQuiz,
    getQuestionAnimationClass,
  } = useQuiz();

  // State to control the animation
  const [animate, setAnimate] = useState(false);

  // Progress percentage
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300); 

    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // If no question is available, show minimal UI with exit button
  if (!currentQuestion) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-700">No question available</p>
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

  // Is this the last question?
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Current user answer for this question
  const userAnswer = userAnswers[currentQuestionIndex];

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mx-auto transition-all duration-300 ease-in-out ${getQuestionAnimationClass()}`}
    >
      <div className="order-2 lg:order-1 space-y-8">
        {/* Bubbly progress bar with star */}
        <div className="w-full bg-gray-200 rounded-full h-6 relative p-1">
          {/* Important: removed overflow-hidden from the container so star isn't cut off */}
          <div
            className="h-4 rounded-full bg-gradient-to-r from-red-600 to-red-800 transition-all duration-1000 ease-out flex items-center overflow-hidden"
            style={{
              width: animate ? `${progressPercentage}%` : "0%",
              boxShadow: "0 0 10px rgba(220, 38, 38, 0.5)",
            }}
          >
            {/* Bubbles inside progress bar */}
            <div className="absolute inset-0">
              <div className="bubble-effect w-full h-full opacity-50"></div>
            </div>
          </div>

          {/* Star at the end of progress - Completely outside the progress bar */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out z-10"
            style={{
              left: animate ? `${progressPercentage}%` : "0%",
            }}
          >
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

        {/* Question header */}
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-red-900 mb-4">
          Question {currentQuestionIndex + 1}
        </h3>

        {/* Question text */}
        <p className="text-lg text-gray-700 mb-4">
          {currentQuestion.question || "No question text available"}
        </p>

        <div className="pt-4 flex flex-col gap-5">
          {/* True/False buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleAnswer(true)}
              className={`w-36 flex items-center justify-center px-6 py-2 rounded-md text-sm font-medium transition duration-300 ${
                userAnswer === true
                  ? "bg-red-800 hover:bg-red-900 text-white"
                  : "bg-white border-2 border-red-800 text-red-800 hover:bg-red-50"
              }`}
            >
              <Check className="h-4 w-4 mr-2" />
              True
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className={`w-36 flex items-center justify-center px-6 py-2 rounded-md text-sm font-medium transition duration-300 ${
                userAnswer === false
                  ? "bg-red-800 hover:bg-red-900 text-white"
                  : "bg-white border-2 border-red-800 text-red-800 hover:bg-red-50"
              }`}
            >
              <X className="h-4 w-4 mr-2" />
              False
            </button>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center justify-center px-6 py-2 rounded-md text-sm font-medium transition duration-300 ${
                currentQuestionIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-white border-2 border-red-800 text-red-800 hover:bg-red-50"
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <button
              onClick={goToNextQuestion}
              disabled={userAnswer === null}
              className={`flex items-center justify-center px-6 py-2 rounded-md text-sm font-medium transition duration-300 ${
                userAnswer === null
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-red-800 hover:bg-red-900 text-white"
              }`}
            >
              {isLastQuestion ? "Finish Quiz" : "Next"}
              {!isLastQuestion && <ArrowRight className="h-4 w-4 ml-2" />}
            </button>
          </div>
        </div>
      </div>

      {/* Image section */}
      <div className="order-1 lg:order-2">
        <div className="w-full h-100 flex items-center justify-center overflow-hidden">
          <Image
            src={currentQuestion.image || ""}
            width={300}
            height={300}
            alt="Quiz featured image"
            className="rounded-2xl object-contain max-h-full max-w-full"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
