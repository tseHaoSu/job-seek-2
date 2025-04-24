import { prisma } from "@/prisma/client";
import { Award, Trophy } from "lucide-react";
import { notFound } from "next/navigation";
import Hero from "./_components/Hero";
import ModuleCard from "./_components/ModuleCard";
import QuizCard from "./_components/QuizCard";
import Video from "@/app/_components/Video";
import { ProgressConfetti } from "./_components/ProgressConfetti";

// Server component
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      quizzes: true,
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

  return (
    <>
      <Video
        videoSrc="/video/question.mp4"
        heading="Empowering Experience with Digital Confidence"
        subtext="Because learning never stops — nor should you."
      />
      <ProgressConfetti progressPercentage={progressPercentage} />

      <div>
        <Hero
          category={{
            name: category.name,
            description: category.description || "No description available.",
          }}
          stats={stats}
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Trophy className="mr-2 h-7 w-7 text-red-600" />
          Simple Action Guides
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
          Try it Yourself!
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
    </>
  );
};

export default Page;
