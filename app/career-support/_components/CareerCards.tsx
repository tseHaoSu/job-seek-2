import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Fixed import path
import { Users, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-stretch">
      <Card className="w-full rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 hover:scale-105 duration-300 cursor-pointer border border-gray-200">
        <div className="flex justify-center pt-8 text-red-400">
          <Users size={64} />
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Job Platforms Guidance
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Get help and advice on writing resumes and using job search
            platforms here.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="hidden md:flex items-center">
        <Separator orientation="vertical" className="h-64 bg-gray-200" />
      </div>

      <Link href="/career-support/resume-support" className="w-full">
        <Card className="w-full h-full rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 hover:scale-105 duration-300 cursor-pointer border border-gray-200">
          <div className="flex justify-center pt-8 text-red-400">
            <BookOpen size={64} />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Resume Support
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Get help and advice on writing resumes and using job search
              platforms here.
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default Cards;
