"use client";

import { BookOpen, Star, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertDialog } from "@/components/ui/alert-dialog";
import ConfirmModal from "@/app/_components/ConfirmModal";
import Hint from "@/app/_components/Hint";

export interface Category {
  name: string;
  description: string;
}

interface Stats {
  moduleStats: {
    completed: number;
    total: number;
  };
  quizStats: {
    completed: number;
    total: number;
  };
  progressPercentage: number;
}

interface HeroProps {
  category: Category;
  stats: Stats;
  imagePath?: string;
}

const Hero = ({ category, stats, imagePath = "/old-man.jpeg" }: HeroProps) => {
  const {
    moduleStats: { completed: completedModules, total: totalModules },
    quizStats: { completed: completedQuizzes, total: totalQuizzes },
    progressPercentage,
  } = stats;

  const [isResetting, setIsResetting] = useState(false);
  const router = useRouter();

  const resetProgress = async () => {
    try {
      setIsResetting(true);
      await axios.patch("/api/attempt-change");
      router.refresh();
    } catch (error) {
      console.error("Error resetting progress:", error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes progressGrow {
          from {
            width: 0%;
          }
          to {
            width: ${progressPercentage}%;
          }
        }

        @keyframes progressStar {
          from {
            left: 0%;
          }
          to {
            left: ${Math.min(progressPercentage, 100)}%;
          }
        }
      `}</style>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        <div className="order-2 lg:order-1 space-y-6">
          <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
            {category.name}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            {category.description}
          </p>
          <div className="pt-4 flex flex-col gap-5">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 w-fit">
              <BookOpen className="mr-1 h-4 w-4" />
              {completedQuizzes} out of {totalQuizzes} Quizzes Attempted
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800 w-fit">
              <BookOpen className="h-4 w-4 mr-1" />
              {completedModules} out of {totalModules} Modules Complete
            </span>
            <span
              onClick={resetProgress}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-300 text-red-600 w-fit hover:bg-red-400 hover:text-red-700 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4 mr-1" />
              {isResetting ? "Resetting..." : "Reset Progress"}
            </span>
            <span className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                <span className="flex items-center ml-2">
                  Category Progress
                </span>
                <span className="text-green-600 font-medium">
                  {progressPercentage}%
                </span>
              </div>
              <div className="relative h-3 w-full bg-gray-200 rounded-full mb-4 mt-5">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${progressPercentage}%`,
                    animation: "progressGrow 1.5s ease-out",
                  }}
                ></div>
                <span
                  className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out"
                  style={{
                    left: `${Math.min(progressPercentage, 100)}%`,
                    marginLeft: "-10px",
                    animation: "progressStar 1.5s ease-out",
                  }}
                >
                  <Hint
                    label="Hit 100% to see confetti!"
                    side="top"
                    sideOffset={5}
                  >
                    <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
                  </Hint>
                </span>
              </div>
            </span>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src={imagePath}
            width={600}
            height={600}
            alt="Category featured image"
            className="rounded-2xl shadow-2xl h-100 object-cover hover:shadow-red-200 duration-300 transform hover:scale-105 transition-all"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
