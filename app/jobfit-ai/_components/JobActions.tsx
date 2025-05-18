"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileEdit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface JobActionsProps {
  externalUrl: string | null;
  jobId: number;
}

const JobActions = ({ externalUrl, jobId }: JobActionsProps) => {
  const router = useRouter();
  const handleGenerateCV = () => {
    router.push(`/career-support/resume-support/${jobId}`);
  };
  return (
    <div className="mt-8 flex gap-4">
      {externalUrl && (
        <Link href={externalUrl} target="_blank" className="flex-1">
          <Button className="w-full py-6 bg-red-900 hover:bg-red-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            <ExternalLink className="h-5 w-5 mr-2" />
            Apply Now
          </Button>
        </Link>
      )}
      <Button
        className="py-6 flex items-center gap-2 bg-white border-red-900 hover:bg-red-50 text-red-900 border font-medium shadow-sm hover:shadow-md transition-all duration-300"
        variant="outline"
        onClick={handleGenerateCV}
      >
        <FileEdit className="h-5 w-5" />
        Generate CV
      </Button>
    </div>
  );
};

export default JobActions;
