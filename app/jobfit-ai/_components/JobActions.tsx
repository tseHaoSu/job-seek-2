"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileEdit, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobStore } from "@/lib/stores/jobStore";
import { getJobById } from "@/app/actions/getJobById";
import { useToast } from "@/components/ui/use-toast";

interface JobActionsProps {
  externalUrl: string | null;
  jobId: number;
}

const JobActions = ({ externalUrl, jobId }: JobActionsProps) => {
  const router = useRouter();
  const setJobData = useJobStore((state) => state.setJobData);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCV = async () => {
    setIsLoading(true);
    try {
      const jobData = await getJobById(jobId);
      if (!jobData) {
        toast({
          title: "Error",
          description: "Failed to load job information",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      setJobData({
        id: jobData.id,
        title: jobData.title,
        seniority: jobData.seniority,
        employmentType: jobData.employmentType,
        location: jobData.location,
        companyName: jobData.companyName,
        jobFunctions: jobData.jobFunctions,
      });

      router.push(`/career-support/resume-support/${jobId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load job information",
        variant: "destructive",
      });
      console.error("Error loading job data:", error);
      setIsLoading(false);
    }
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
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Building Form...
          </>
        ) : (
          <>
            <FileEdit className="h-5 w-5" />
            Generate CV
          </>
        )}
      </Button>
    </div>
  );
};

export default JobActions;
