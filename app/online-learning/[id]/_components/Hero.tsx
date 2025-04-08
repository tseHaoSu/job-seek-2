"use client";

import { BookOpen, Star } from "lucide-react";
import React from "react";
import Image from "next/image";

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
      <div className="order-2 lg:order-1">
        <div className="space-y-6">
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
            <span className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                <span className="flex items-center">Category Progress</span>
                <span className="text-green-600 font-medium">
                  {progressPercentage}%
                </span>
              </div>
              <div className="relative h-3 w-full bg-gray-200 rounded-full mb-4 mt-5">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                ></div>
                <span
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{
                    left: `${Math.min(progressPercentage, 100)}%`,
                    marginLeft: "-10px", // Half of the star width to center at the end
                  }}
                >
                  <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
                </span>
              </div>
            </span>
          </div>
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
  );
};

export default Hero;
