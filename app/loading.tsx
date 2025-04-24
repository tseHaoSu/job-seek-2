"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

export function LoadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Start with a small progress value
    setProgress(10);

    // Simulate progress increments with more frequent updates
    const timers = [
      setTimeout(() => setProgress(20), 200),
      setTimeout(() => setProgress(35), 400),
      setTimeout(() => setProgress(50), 600),
      setTimeout(() => setProgress(65), 800),
      setTimeout(() => setProgress(80), 1000),
      setTimeout(() => setProgress(90), 1200),
      setTimeout(() => setProgress(95), 1400),
    ];

    // Clean up all timers when component unmounts
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-6 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg animate-pulse">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-2" />
        <div
          className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
          style={{ animationDuration: "2s" }}
        ></div>
      </div>

      <h2 className="text-xl font-bold text-center bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
        Loading...
      </h2>

      <div className="w-full relative">
        <Progress value={progress} className="w-full h-4 relative z-10" />
        <div
          className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>

      <div className="flex justify-between w-full">
        <p className="text-sm font-medium">Progress: {progress}%</p>
        <p className="text-sm font-medium">
          {progress < 100 ? "Please wait..." : "Complete!"}
        </p>
      </div>
    </div>
  );
}

// For use in a Next.js loading.js file
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <LoadingProgress />
    </div>
  );
}
