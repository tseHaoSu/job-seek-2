"use client";

import React from "react";
import { Job } from "./types";
import JobBadges from "./JobBadges";

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
      <p className="mt-2 mb-3 font-semibold">{job.salary}</p>

      <div className="my-3">
        <JobBadges
          seniority={job.seniority}
          employmentType={job.employmentType}
          country={job.country}
        />
      </div>

      <div className="mt-2">
        <span className="text-sm text-gray-500">{job.timePosted}</span>
      </div>
    </div>
  );
};

export default JobListItem;
