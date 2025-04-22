"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface Quiz {
  id: number;
  categoryId: number;
  title: string;
  attempt: boolean;
}

const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const startQuiz = async () => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/quizzes/${quiz.id}`);
      router.push(`/quizzes/${quiz.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error starting quiz:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
      <div className="mb-4">
        <Badge
          variant={quiz.attempt ? "outline" : "outline"}
          className={`${
            quiz.attempt
              ? "text-green-600 border-green-600 bg-green-50"
              : "text-red-600 border-red-600 bg-red-50"
          }`}
        >
          {quiz.attempt ? "Completed" : "Not Started"}
        </Badge>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">
        Take this quiz to test your knowledge
      </p>
      <div className="mt-auto flex justify-between items-center">
        <button
          onClick={startQuiz}
          disabled={isLoading}
          className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          <span>{isLoading ? "Starting..." : "Start Quiz"}</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default QuizCard;

