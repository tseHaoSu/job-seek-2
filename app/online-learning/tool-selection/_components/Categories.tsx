// Categories.tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import {
  BookOpen,
  FileText,
  Globe,
  Presentation,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Categories = async () => {
  const categories = await prisma.category.findMany();

  const icons = [
    <BookOpen key="book" size={48} className="text-red-800" />,
    <FileText key="file" size={48} className="text-red-800" />,
    <Presentation key="presentation" size={48} className="text-red-800" />,
    <Users key="users" size={48} className="text-red-800" />,
    <Star key="star" size={48} className="text-red-800" />,
    <Globe key="globe" size={48} className="text-red-800" />,
  ];

  const getIconForIndex = (index: number) => {
    return icons[index % icons.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {categories.map((category, index) => (
        <Link
          href={`/online-learning/${category.id}`}
          className="block"
          key={category.id || index}
        >
          <Card className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-red-800 hover:scale-105 duration-300 cursor-pointer border-red-300">
            <div className="flex justify-center pt-8 text-red-800">
              {getIconForIndex(index)}
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-red-800">
                {category.name}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
