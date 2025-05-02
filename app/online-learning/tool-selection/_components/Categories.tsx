"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import {
  BookOpen,
  FileText,
  Globe,
  Heart,
  Presentation,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";


interface Category {
  id: string;
  name: string;
  description?: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const icons = useMemo(
    () => [
      <BookOpen key="book" size={48} />,
      <FileText key="file" size={48} />,
      <Presentation key="presentation" size={48} />,
      <Users key="users" size={48} />,
      <Star key="star" size={48} />,
      <Globe key="globe" size={48} />,
    ],
    []
  );

  const getIconForIndex = (index: number) => {
    return icons[index % icons.length];
  };

  const fetchCategories = async () => {
    if (categories.length === 0 && !isLoading) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api"); 
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {categories.map((category, index) => (
        <Link
          href={`/online-learning/${category.id}`}
          className="block"
          key={category.id || index}
        >
          <Card className="h-full rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 hover:scale-105 duration-300 cursor-pointer border-red-300">
            <div className="flex justify-center pt-8 text-red-700">
              {getIconForIndex(index)}
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-gray-800">
                {category.name}
              </CardTitle>
              {/* {category.description && (
                <CardDescription className="text-sm text-gray-600">
                  {category.description}
                </CardDescription>
              )} */}
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
