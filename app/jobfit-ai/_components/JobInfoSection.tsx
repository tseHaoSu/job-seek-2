"use client";

import React from "react";
import { Job } from "./types";
import {
  Building,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  CalendarClock,
} from "lucide-react";

interface JobInfoSectionProps {
  job: Job;
}

const JobInfoSection = ({ job }: JobInfoSectionProps) => {
  return (
    <div className="flex flex-col gap-3 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
      <div className="flex items-center">
        <Building className="h-5 w-5 text-red-800 mr-2" />
        <span className="text-gray-800 font-medium">
          {job.companyName}{" "}
          {job.companyUrl && (
            <a
              href={job.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-900 hover:text-red-700 hover:underline ml-1 text-sm font-semibold"
            >
              Visit Company LinkedIn
            </a>
          )}
        </span>
      </div>
      <div className="flex items-center">
        <MapPin className="h-5 w-5 text-red-800 mr-2" />
        <span className="text-gray-800">{job.location}</span>
      </div>
      {job.salary && (
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-red-800 mr-2" />
          <span className="text-gray-800 font-semibold">{job.salary}</span>
        </div>
      )}
      {job.applicantsCount && (
        <div className="flex items-center">
          <Users className="h-5 w-5 text-red-800 mr-2" />
          <span className="text-gray-800">
            {job.applicantsCount} applicants
          </span>
        </div>
      )}
      {job.timePosted && (
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-red-800 mr-2" />
          <span className="text-gray-800">
            Posted: {new Date(job.created).toLocaleDateString()}
          </span>
        </div>
      )}
      {job.lastUpdated && (
        <div className="flex items-center">
          <CalendarClock className="h-5 w-5 text-red-800 mr-2" />
          <span className="text-gray-800">
            Last update: {new Date(job.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default JobInfoSection;
