import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import { Category } from "@prisma/client";
import { BookOpen, FileText, Presentation, Users } from "lucide-react";
import Link from "next/link";

const Categories = async () => {
  const categories: Category[] = await prisma.category.findMany();

  // Define the icon mapping
  const getIcon = (name: string) => {
    switch (name) {
      case "Quiz":
        return <BookOpen size={48} />;
      case "Assignment":
        return <FileText size={48} />;
      case "Lecture":
        return <Presentation size={48} />;
      case "Discussion":
        return <Users size={48} />;
      default:
        return <FileText size={48} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <Link
          href={`/online-learning/${category.id}`}
          className="block"
          key={index}
        >
          <Card className="h-full rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 hover:scale-105 duration-300 cursor-pointer">
            <div className="flex justify-center pt-8 text-red-700">
              {getIcon(category.name)}
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-gray-800">
                {category.name}
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
