"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useJobStore } from "@/lib/stores/jobStore";

const PageLoading = () => {
  const { jobData } = useJobStore();

  if (jobData) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center space-y-6">
        <Loader2 className="h-16 w-16 text-red-800 animate-spin mx-auto" />
        <h3 className="text-xl font-bold text-red-900">
          Building Resume Structure
        </h3>
        <p className="text-gray-600">
          Please wait while we prepare your resume template based on the job
          details. This will only take a moment...
        </p>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-red-800 animate-pulse rounded-full w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
