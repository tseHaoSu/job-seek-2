"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export function LoadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Start with a small progress value
    setProgress(10);

    // Simulate progress increments
    const timer1 = setTimeout(() => setProgress(30), 300);
    const timer2 = setTimeout(() => setProgress(50), 600);
    const timer3 = setTimeout(() => setProgress(70), 900);
    const timer4 = setTimeout(() => setProgress(90), 1200);

    // Clean up all timers when component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-4">
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-gray-500">Loading: {progress}%</p>
    </div>
  );
}

// For use in a Next.js loading.js file
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingProgress />
    </div>
  );
}
