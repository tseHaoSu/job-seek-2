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
    <>
      <div className="relative">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-2" />
        <div
          className="absolute inset-0 rounded-full bg-primary/10 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <h2 className="text-xl font-bold text-center bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
        Loading...
      </h2>

      <div className="w-full relative">
        <Progress value={progress} className="w-full h-4 relative z-10" />
        <div
          className="absolute inset-0 bg-primary/5 rounded-full"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>

      <div className="flex justify-between w-full">
        <p className="text-sm font-medium">Progress: {progress}%</p>
      </div>
    </>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingProgress />
    </div>
  );
}
