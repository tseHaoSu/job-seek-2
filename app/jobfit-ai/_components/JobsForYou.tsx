"use client";

import React, { useEffect, useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import { Job } from "./types";
import JobList from "./JobList";
import JobDetail from "./JobDetail";
import Loading from "../loading";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // Update 
  useEffect(() => {
    if (data) {
      const allJobs = data.pages.flatMap((page) =>
        page.jobs.map((job: any) => ({
          ...job,
          jobFunctions: Array.isArray(job.jobFunctions)
            ? job.jobFunctions
            : [job.jobFunction || { id: 1, name: "Unknown" }],
        }))
      );
      setJobs(allJobs);
      if (allJobs.length > 0 && !selectedJob) {
        setSelectedJob(allJobs[0]);
      }
    }
  }, [data, selectedJob]);

  const fetchMoreData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const toggleFavorite = async (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();

    // Optimistically update UI
      const updatedJobs = jobs.map((j) =>
        j.id === job.id ? { ...j, isFavorite: !j.isFavorite } : j
      );
      setJobs(updatedJobs);

      if (selectedJob && selectedJob.id === job.id) {
        setSelectedJob({
          ...selectedJob,
          isFavorite: !selectedJob.isFavorite,
        });
      }

    // Show toast notification
    toast({
      variant: "success",
      title: job.isFavorite
        ? "Job removed from favorites"
        : "Job added to favorites",
      description: job.isFavorite
        ? "This job has been removed from your favorites list"
        : "This job has been added to your favorites list",
    });

    try {
      await axios.patch(`/api/jobs/${job.id}/favorite`, {
        isFavorite: !job.isFavorite,
      });

      // Success case already handled optimistically
    } catch (error) {
      console.error("Error toggling favorite:", error);

      // Revert changes on error
      toast({
        variant: "destructive",
        title: "Failed to update favorites",
        description: "Please try again later",
      });

      // Revert the UI changes
      const revertedJobs = jobs.map((j) =>
        j.id === job.id ? { ...j, isFavorite: job.isFavorite } : j
      );
      setJobs(revertedJobs);

      if (selectedJob && selectedJob.id === job.id) {
        setSelectedJob({
          ...selectedJob,
          isFavorite: job.isFavorite,
        });
      }
    }
  };

  if (error) return <div>Failed to load jobs</div>;
  if (isLoading) return <Loading />;
  if (!selectedJob) return <div>No jobs available</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
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
