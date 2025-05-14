"use client";

import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Module {
  attempt: boolean;
  title: string;
  categoryId: number;
  id: number;
  description: string | null;
}

const ModuleCard = ({ module }: { module: Module }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const startModule = async () => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/modules/${module.id}`);
      router.push(`/online-learning/modules/${module.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error starting module:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 border border-red-500 h-full flex flex-col">
      <div className="mb-4">
        <Badge
          variant="outline"
          className={`${
            module.attempt
              ? "text-green-600 border-green-600 bg-green-50"
              : "text-red-600 border-red-600 bg-red-50"
          }`}
        >
          {module.attempt ? "Completed" : "Not Started"}
        </Badge>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">
        {module.description || "Learn the fundamentals in this module"}
      </p>
      <div className="mt-auto flex justify-between items-center">
        <button
          onClick={startModule}
          disabled={isLoading}
          className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          <span>{isLoading ? "Starting..." : "Start Module"}</span>
          <ArrowRight className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;
