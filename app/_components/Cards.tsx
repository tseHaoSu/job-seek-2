import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Users } from "lucide-react";
import Link from "next/link";

const Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      <div>
        <Link href="/online-learning/tools-guide">
          <Card className="h-full rounded-xl overflow-hidden hover:shadow-xl hover:border-red-300 hover:scale-105 duration-300 cursor-pointer border-red-100">
            <div className="flex justify-center pt-8 text-red-400">
              <Users size={64} />
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Tools Guide
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Explore the best tools for your career. Never too late.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
        <Separator orientation="vertical" className="h-full bg-gray-300" />
      </div>
      <div>
        <Link href="/career-support/resume-support">
          <Card className="h-full rounded-xl overflow-hidden hover:shadow-xl hover:border-red-300 hover:scale-105 duration-300 cursor-pointer border-red-100">
            <div className="flex justify-center pt-8 text-red-400">
              <BookOpen size={64} />
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Resume Guidance AI
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Use our cutting edge AI to guide you through your resume writing
                process
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
