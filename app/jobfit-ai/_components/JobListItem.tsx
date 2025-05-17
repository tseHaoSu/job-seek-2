"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { getEmploymentTypeColor, getSeniorityColor } from "@/lib/constant";
import { Job } from "./types";

interface JobListItemProps {
  job: Job;
  isSelected: boolean;
  onSelect: (job: Job) => void;
}

const JobListItem = ({ job, isSelected, onSelect }: JobListItemProps) => {
  return (
    <div
      className={`border relative ${
        isSelected ? "border-red-900 bg-red-50" : "border-gray-200"
      } rounded-lg p-4 hover:shadow-md transition-all cursor-pointer`}
      onClick={() => onSelect(job)}
    >
      <h3 className="font-bold text-lg text-red-900">{job.title}</h3>
      <p className="text-gray-700">{job.companyName}</p>
      <p className="text-gray-700">{job.location}</p>
      <p className="mt-2 font-semibold">{job.salary}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {job.seniority && (
          <Badge className={getSeniorityColor(job.seniority)} variant="outline">
            {job.seniority}
          </Badge>
        )}
        {job.employmentType && (
          <Badge
            className={getEmploymentTypeColor(job.employmentType)}
            variant="outline"
          >
            {job.employmentType}
          </Badge>
        )}
      </div>
      <div className="mt-3">
        <span className="text-sm text-gray-500">{job.timePosted}</span>
      </div>
    </div>
  );
};

export default JobListItem;
