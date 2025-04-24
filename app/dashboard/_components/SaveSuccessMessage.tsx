import React from "react";
import { CheckCircle2 } from "lucide-react";

export const SaveSuccessMessage = () => {
  return (
    <div className="flex items-center text-green-600 bg-green-50 px-3 py-1.5 rounded-lg animate-pulse">
      <CheckCircle2 className="h-4 w-4 mr-2" />
      <span className="text-sm font-medium">Layout saved successfully!</span>
    </div>
  );
};
