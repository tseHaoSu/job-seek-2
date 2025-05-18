"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ExternalLink, FileText, Heart } from "lucide-react";
import React from "react";
import Expandable from "./Exapndable";
import JobActions from "./JobActions";
import JobBadges from "./JobBadges";
import JobInfoSection from "./JobInfoSection";
import { Job } from "./types";

interface JobDetailProps {
  job: Job;
  toggleFavorite: (job: Job, e: React.MouseEvent) => void;
}

const JobDetail = ({ job, toggleFavorite }: JobDetailProps) => {
  if (!job) return null;

  return (
    <div className="w-full lg:w-3/5 mt-6 lg:mt-0">
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-red-900 tracking-tight">
            {job.title}
          </h2>
          <button
            onClick={(e) => toggleFavorite(job, e)}
            className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
          >
            <Heart
              className={`h-6 w-6 ${
                job.isFavorite ? "fill-red-900 text-red-900" : "text-red-900"
              }`}
            />
          </button>
        </div>

        {job.externalUrl && (
          <div className="mb-6 flex items-center">
            {job.companyName && (
              <Avatar className="w-14 h-14 mr-3 bg-red-800 text-white font-bold text-2xl border-2 border-red-100">
                <div className="flex items-center justify-center w-full h-full">
                  {job.companyName.charAt(0).toUpperCase()}
                </div>
              </Avatar>
            )}
            <a
              href={job.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-900 hover:text-red-700 hover:underline flex items-center font-medium"
            >
              View Job Posting
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        )}

        <JobBadges
          seniority={job.seniority}
          employmentType={job.employmentType}
          country={job.country}
        />

        <JobInfoSection job={job} />

        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center">
            <FileText className="h-8 w-8 mr-2 text-red-800" />
            Job Description
          </h3>
          <div className="text-gray-700 whitespace-pre-line border-l-4 border-red-100 pl-4">
            <Expandable>{job.description}</Expandable>
          </div>
        </div>

        {job.jobFunctions && job.jobFunctions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-red-800" />
              Job Functions
            </h3>
            <div className="flex flex-wrap gap-2 ml-4">
              {job.jobFunctions.map((jobFunction) => (
                <Badge
                  key={jobFunction.id}
                  variant="secondary"
                  className="bg-red-50 text-red-900 hover:bg-red-100"
                >
                  {jobFunction.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <JobActions externalUrl={job.externalUrl} jobId={job.id} />
      </div>
    </div>
  );
};

export default JobDetail;
