import { prisma } from "@/prisma/client";
import { Award, Trophy } from "lucide-react";
import { notFound } from "next/navigation";
import Hero from "./_components/Hero";
import ModuleCard from "./_components/ModuleCard";
import QuizCard from "./_components/QuizCard";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      quizzes: {
        include: {
          questions: true,
        },
      },
      modules: true,
    },
  });

  if (!category) {
    notFound();
  }

  const moduleStats = {
    completed: category.modules.filter((module) => module.attempt).length,
    total: category.modules.length,
  };

  const quizStats = {
    completed: category.quizzes.filter((quiz) => quiz.attempt).length,
    total: category.quizzes.length,
  };

  const progressPercentage =
    moduleStats.total + quizStats.total > 0
      ? Math.round(
          ((moduleStats.completed + quizStats.completed) /
            (moduleStats.total + quizStats.total)) *
            100
        )
      : 0;

  const stats = {
    moduleStats,
    quizStats,
    progressPercentage,
  };

  if (!category) {
    notFound();
  }
  return (
    <div className="mx-auto sm:px-6 lg:px-8">
      <Hero
        category={{
          name: category.name,
          description: category.description || "No description available.",
        }}
        stats={stats}
      />
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Trophy className="mr-2 h-7 w-7 text-red-600" />
        Learning Modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {category.modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
        {category.modules.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">
              No learning modules available in this category yet.
            </p>
          </div>
        )}
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Award className="mr-2 h-7 w-7 text-red-600" />
        Available Quizzes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
        {category.quizzes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No quizzes available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
