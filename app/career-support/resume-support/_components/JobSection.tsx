"use client";

import React from "react";
import { useJobStore } from "@/lib/stores/jobStore";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const JobSection = () => {
  const { jobData } = useJobStore();
  const params = useParams();
  const jobId = params.id ? Number(params.id) : null;

  if (!jobData && !jobId) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-red-800">Selected job</h3>
      </div>

      {jobData ? (
        <div className="p-4 border border-none rounded-md space-y-4 bg-red-50/40">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-red-800">{jobData.title}</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-red-800">Company</Label>
              <Input
                value={jobData.companyName || "Company not specified"}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                readOnly
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label className="text-red-800">Location</Label>
              <Input
                value={jobData.location || "Not specified"}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                readOnly
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label className="text-red-800">Employment Type</Label>
              <Input
                value={jobData.employmentType || "Not specified"}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                readOnly
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label className="text-red-800">Seniority</Label>
              <Input
                value={jobData.seniority || "Not specified"}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                readOnly
              />
            </div>

            {jobData.jobFunctions && jobData.jobFunctions.length > 0 && (
              <div className="flex flex-col space-y-1.5">
                <Label className="text-red-800">Job Functions</Label>
                <Input
                  value={jobData.jobFunctions
                    .map((func) => func.name)
                    .join(", ")}
                  className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                  readOnly
                />
              </div>
            )}
          </div>

          <div className="mt-4">
          
          </div>
        </div>
      ) : (
        <div className="p-4 border border-none rounded-md bg-red-50/40">
          <p className="text-red-700">
            No job selected. Choose a job from the job listings first.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobSection;
