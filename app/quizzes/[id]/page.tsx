import { prisma } from "@/prisma/client";
import TrueFalseQuiz from "../_components/TrueFalseQuiz";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: parseInt(id) },
    include: {
      questions: true,
    },
  });
  if (!quiz) {
    notFound();
  }
  const quizData = {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    timeEstimate: quiz.timeEstimate,
    questions: quiz.questions.map((question) => ({
      id: question.id,
      question: question.question,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    })),
  };
  return (
    <>
      <TrueFalseQuiz quiz={quizData} />
    </>
  );
};

export default page;
