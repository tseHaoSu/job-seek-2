import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Bot, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

const MainFeature = () => {
  return (
    <div className="space-y-10">
      <div className="text-left">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900 leading-tight">
          What Can This Platform Do for You?
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <Link href="/online-learning/tool-selection" className="block">
          <Card className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-red-800 hover:scale-105 duration-300 cursor-pointer border-red-300">
            <div className="flex justify-center pt-8 text-red-400">
              <BookOpen size={64} />
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Tool Guide
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Step-by-step lessons and quizzes to master tools like Excel and Zoom.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>   
        {/* Card 2 */}
        <Link href="/career-support/resume-support" className="w-full">
          <Card className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-red-800 hover:scale-105 duration-300 cursor-pointer border-red-300">
            <div className="flex justify-center pt-8 text-red-400">
              <Bot size={64} />
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Resume Guidance AI
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Advance AI model to help you guide through the obstacles of the resume building process
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        {/* Card 3 */}
        <Link href="/jobfit-ai" className="w-full">
          <Card className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-red-800 hover:scale-105 duration-300 cursor-pointer border-red-300">
            <div className="flex justify-center pt-8 text-red-400">
              <BriefcaseBusiness size={64} />
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                JobFit AI
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Find personalized job suggestions based on your experience.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};


export default MainFeature;
