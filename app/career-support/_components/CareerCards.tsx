import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Fixed import path
import { Users, BookOpen, Bot, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-stretch">
      <Link href="/jobfit-ai" className="w-full">
        <Card className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-red-800 hover:scale-105 duration-300 cursor-pointer border-red-300">
          <div className="flex justify-center pt-8 text-red-400">
            <UserRoundSearch size={64} />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Jobfit AI
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Fresh jobs, tailored to your skills and interests with the help of AI
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>

      <div className="hidden md:flex items-center">
        <Separator orientation="vertical" className="h-64 bg-gray-200" />
      </div>

      <Link href="/career-support/resume-support" className="w-full">
        <Card className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-red-800 hover:scale-105 duration-300 cursor-pointer border-red-300">
          <div className="flex justify-center pt-8 text-red-400">
            <Bot size={64} />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Resume Guidance AI.
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Advance AI model to help you guide through the obstacles of the resume building process
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default Cards;
