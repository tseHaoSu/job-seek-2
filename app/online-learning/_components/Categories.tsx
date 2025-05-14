import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Presentation } from "lucide-react";
import Link from "next/link";
import React from "react";

const Categories = () => {
  const staticCategories = [
    {
      id: "tools-guide",
      title: "Tools Guide",
      description: "Explore the list of course tools to select your choice!",
      icon: <BookOpen size={48} className="text-red-800" />,
      link: "/online-learning/tool-selection",
    },
    {
      id: "recommendation",
      title: "Recommendation",
      description: "Get a personalized recommendation based on your needs.",
      icon: <Presentation size={48} className="text-red-800" />,
      link: "/online-learning/recommend-question",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {staticCategories.map((category, index) => (
        <Link href={category.link} className="block" key={index}>
          <Card className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-red-800 hover:scale-105 duration-300 cursor-pointer border-red-300">
            <div className="flex justify-center pt-8 text-red-800">
              {category.icon}
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-red-800">
                {category.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {category.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
