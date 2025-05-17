"use client";

import React, { useEffect, useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import { Job } from "./types";
import JobList from "./JobList";
import JobDetail from "./JobDetail";
import Loading from "../loading";

const JobsForYou = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobs();

  const [jobs, setJobs] = useState<Job[]>([]);
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

  if (error) return <div>Failed to load jobs</div>;
  if (isLoading) return <Loading />;
  if (!selectedJob) return <div>No jobs available</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6" suppressHydrationWarning>
      <JobList
        jobs={jobs}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        hasNextPage={hasNextPage}
        fetchMoreData={fetchMoreData}
      />
      <div className="hidden lg:block border-r border-gray-200 mx-4"></div>
      <JobDetail job={selectedJob} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default JobsForYou;
