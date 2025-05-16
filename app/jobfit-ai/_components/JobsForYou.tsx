"use client";

import React, { useState, useEffect } from "react";
import {
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  FileEdit,
  Users,
  ExternalLink,
  FileText,
  Briefcase,
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useJobs } from "@/hooks/useJobs";
import {
  getCountryColor,
  getEmploymentTypeColor,
  getSeniorityColor,
} from "@/lib/constant";
import Loading, { LoadingProgress } from "@/app/loading";
import Expandable from "./Exapndable";


// Type definition based on your Prisma model
interface Job {
  id: number;
  created: Date;
  lastUpdated: Date;
  timePosted: string | null;
  title: string;
  description: string;
  seniority: string | null;
  employmentType: string | null;
  location: string | null;
  url: string | null;
  externalUrl: string | null;
  applicantsCount: string | null;
  salary: string | null;
  country: string | null;
  companyName: string | null;
  companyUrl: string | null;
  isFavorite: boolean;
  jobFunction: { id: number; name: string };
}

const JobsForYou = () => {
  // Use the custom hook to fetch jobs with infinite scrolling
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobs();

  // State to store all jobs from all pages
  const [jobs, setJobs] = useState<Job[]>([]);
  // State to store the selected job
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Update jobs state whenever data changes
  useEffect(() => {
    if (data) {
      const allJobs = data.pages.flatMap((page) =>
        page.jobs.map((job) => ({
          ...job,
          jobFunction: job.jobFunction || { id: 1, name: "Unknown" },
        }))
      );
      setJobs(allJobs);

      // Set the first job as selected if there's no selected job yet
      if (allJobs.length > 0 && !selectedJob) {
        setSelectedJob(allJobs[0]);
      }
    }
  }, [data, selectedJob]);

  // Function to fetch more data
  const fetchMoreData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const toggleFavorite = async (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      // fetch favorite
      // const response = await fetch(`/api/jobs/${job.id}/favorite`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ isFavorite: !job.isFavorite }),
      // });

      // if (!response.ok) throw new Error('Failed to update favorite status');

      // Update jobs array locally
      const updatedJobs = jobs.map((j) =>
        j.id === job.id ? { ...j, isFavorite: !j.isFavorite } : j
      );
      setJobs(updatedJobs);

      // Update selected job if that's the one being toggled
      if (selectedJob && selectedJob.id === job.id) {
        setSelectedJob({
          ...selectedJob,
          isFavorite: !selectedJob.isFavorite,
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Handle loading and error states
  if (error) return <div>Failed to load jobs</div>;
  if (isLoading)
    return (
      <div>
        <LoadingProgress />
      </div>
    );
  if (!selectedJob) return <div>No jobs available</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Job Cards with Infinite Scroll */}
      <div className="w-full lg:w-2/5 pt-5">
        <h2 className="text-xs font-bold mb-4 text-gray-800">Available jobs</h2>
        <div
          id="scrollableDiv"
          className="pr-0 lg:pr-4 max-h-[800px] overflow-y-auto"
        >
          <InfiniteScroll
            dataLength={jobs.length}
            next={fetchMoreData}
            hasMore={!!hasNextPage}
            loader={
              <div className="py-3 text-center text-gray-500">Loading...</div>
            }
            endMessage={
              <div className="py-3 text-center text-gray-500">
                No more jobs to load
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className={`border relative ${
                    selectedJob.id === job.id
                      ? "border-red-900 bg-red-50"
                      : "border-gray-200"
                  } rounded-lg p-4 hover:shadow-md transition-all cursor-pointer`}
                  onClick={() => setSelectedJob(job)}
                >
                  <h3 className="font-bold text-lg text-red-900">
                    {job.title}
                  </h3>
                  <p className="text-gray-700">{job.companyName}</p>
                  <p className="text-gray-700">{job.location}</p>
                  <p className="mt-2 font-semibold">{job.salary}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.seniority && (
                      <Badge
                        className={getSeniorityColor(job.seniority)}
                        variant="outline"
                      >
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
                    <span className="text-sm text-gray-500">
                      {job.timePosted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <div className="hidden lg:block border-r border-gray-200 mx-4"></div>
      {/*  Job Detail */}
      <div className="w-full lg:w-3/5 mt-6 lg:mt-0">
        {selectedJob && (
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-red-900 tracking-tight">
                {selectedJob.title}
              </h2>
              <button
                onClick={(e) => toggleFavorite(selectedJob, e)}
                className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <Heart
                  className={`h-6 w-6 ${
                    selectedJob.isFavorite
                      ? "fill-red-900 text-red-900"
                      : "text-red-900"
                  }`}
                />
              </button>
            </div>
            {selectedJob.externalUrl && (
              <div className="mb-6 flex items-center">
                {selectedJob.companyName && (
                  <Avatar className="w-14 h-14 mr-3 bg-red-800 text-white font-bold text-2xl border-2 border-red-100">
                    <div className="flex items-center justify-center w-full h-full">
                      {selectedJob.companyName.charAt(0).toUpperCase()}
                    </div>
                  </Avatar>
                )}
                <a
                  href={selectedJob.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-900 hover:text-red-700 hover:underline flex items-center font-medium"
                >
                  View Job Posting
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedJob.seniority && (
                <Badge
                  className={`${getSeniorityColor(selectedJob.seniority)} shadow-sm`}
                  variant="outline"
                >
                  {selectedJob.seniority}
                </Badge>
              )}
              {selectedJob.employmentType && (
                <Badge
                  className={`${getEmploymentTypeColor(selectedJob.employmentType)} shadow-sm`}
                  variant="outline"
                >
                  {selectedJob.employmentType}
                </Badge>
              )}
              {selectedJob.country && (
                <Badge
                  className={`${getCountryColor(selectedJob.country)} shadow-sm`}
                  variant="outline"
                >
                  {selectedJob.country}
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-3 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <Building className="h-5 w-5 text-red-800 mr-2" />
                <span className="text-gray-800 font-medium">
                  {selectedJob.companyName}{" "}
                  {selectedJob.companyUrl && (
                    <a
                      href={selectedJob.companyUrl}
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
                <span className="text-gray-800">{selectedJob.location}</span>
              </div>
              {selectedJob.salary && (
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-red-800 mr-2" />
                  <span className="text-gray-800 font-semibold">
                    {selectedJob.salary}
                  </span>
                </div>
              )}
              {selectedJob.applicantsCount && (
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-red-800 mr-2" />
                  <span className="text-gray-800">
                    {selectedJob.applicantsCount} applicants
                  </span>
                </div>
              )}
              {selectedJob.timePosted && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-red-800 mr-2" />
                  <span className="text-gray-800">
                    Posted {selectedJob.timePosted}
                  </span>
                </div>
              )}
              {selectedJob.lastUpdated && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-red-800 mr-2" />
                  <span className="text-gray-800">
                    Last update{" "}
                    {new Date(selectedJob.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center">
                <FileText className="h-8 w-8 mr-2 text-red-800" />
                Job Description
              </h3>
              <div className="text-gray-700 whitespace-pre-line border-l-4 border-red-100 pl-4">
                <Expandable>{selectedJob.description}</Expandable>
              </div>
            </div>

            {selectedJob.jobFunction && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-red-800" />
                  Job Function
                </h3>
                <div className="flex flex-wrap gap-2 ml-4">
                  <Badge
                    variant="secondary"
                    className="bg-red-50 text-red-900 hover:bg-red-100"
                  >
                    {selectedJob.jobFunction.name}
                  </Badge>
                </div>
              </div>
            )}
            <div className="mt-8 flex gap-4">
              <Button className="w-full py-6 bg-red-900 hover:bg-red-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                Apply Now
              </Button>
              <Button
                className="py-6 flex items-center gap-2 bg-white border-red-900 hover:bg-red-50 text-red-900 border font-medium shadow-sm hover:shadow-md transition-all duration-300"
                variant="outline"
              >
                <FileEdit className="h-5 w-5" />
                Generate CV
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsForYou;
