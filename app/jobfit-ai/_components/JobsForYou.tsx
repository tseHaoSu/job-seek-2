"use client";

import React, { useState, useMemo } from "react";
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

  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [favoriteOverrides, setFavoriteOverrides] = useState<
    Record<number, boolean>
  >({});
  const { toast } = useToast();

  //only re-render jobs when data changes or favorite overrides change
  const jobs = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) =>
      page.jobs.map((job: any) => ({
        ...job,
        isFavorite: favoriteOverrides.hasOwnProperty(job.id)
          ? favoriteOverrides[job.id]
          : job.isFavorite,
        jobFunctions: Array.isArray(job.jobFunctions)
          ? job.jobFunctions
          : [job.jobFunction || { id: 1, name: "Unknown" }],
      }))
    );
  }, [data, favoriteOverrides]);

  // only re-render selected job when jobs or selectedJobId changes
  const selectedJob = useMemo(() => {
    if (selectedJobId) {
      return jobs.find((job) => job.id === selectedJobId) || null;
    }
    return jobs.length > 0 ? jobs[0] : null;
  }, [jobs, selectedJobId]);

  const fetchMoreData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const toggleFavorite = async (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();

    const newFavoriteState = !job.isFavorite;
    setFavoriteOverrides((prev) => ({
      ...prev,
      [job.id]: newFavoriteState,
    }));

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
        isFavorite: newFavoriteState,
      });

      // Remove override after successful API call - let server data take over
      setFavoriteOverrides((prev) => {
        const newOverrides = { ...prev };
        delete newOverrides[job.id];
        return newOverrides;
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);

      toast({
        variant: "destructive",
        title: "Failed to update favorites",
        description: "Please try again later",
      });

      // Revert optimistic update
      setFavoriteOverrides((prev) => {
        const newOverrides = { ...prev };
        delete newOverrides[job.id];
        return newOverrides;
      });
    }
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJobId(job.id);
  };

  if (error) return <div>Failed to load jobs</div>;
  if (isLoading) return <Loading />;
  if (!selectedJob) return <div>No jobs available</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <JobList
        jobs={jobs}
        selectedJob={selectedJob}
        setSelectedJob={handleJobSelect}
        hasNextPage={hasNextPage}
        fetchMoreData={fetchMoreData}
      />
      <div className="hidden lg:block border-r border-gray-200 mx-4"></div>
      <JobDetail job={selectedJob} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default JobsForYou;
