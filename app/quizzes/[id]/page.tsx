import { prisma } from "@/prisma/client";
import TrueFalseQuiz from "../_components/TrueFalseQuiz";
import { notFound } from "next/navigation";
import Video from "@/app/_components/Video";

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: parseInt(id) },
    include: {
      questions: true,
    },
  });

  if (!quiz) {
    return notFound();
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
      image: question.mediaUrl,
    })),
  };

  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//writing.mp4"
        heading="Master the Tools You Use at Work"
        subtext="Step-by-step guides for Word, Zoom, Gmail, and more — designed just for you."
      />
      <TrueFalseQuiz quiz={quizData} />
    </>
  );
};

export default page;
