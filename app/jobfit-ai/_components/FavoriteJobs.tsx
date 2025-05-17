"use client";

import React, { useState, useMemo } from "react";
import { useFavoriteJobs } from "@/hooks/useFavoriteJobs";
import { Heart } from "lucide-react";
import axios from "axios";
import { Job } from "./types";
import JobList from "./JobList";
import JobDetail from "./JobDetail";
import Loading from "../loading";
import { useToast } from "@/hooks/use-toast";

const FavoriteJobs = () => {
  const { favoriteJobs, favoriteCount, isLoading, error, refreshFavorites } =
    useFavoriteJobs();
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const { toast } = useToast();
  const [optimisticUpdates, setOptimisticUpdates] = useState<
    Record<number, boolean>
  >({});

  const formattedJobs = useMemo(() => {
    if (!favoriteJobs) return [];

    return favoriteJobs.map((job) => ({
      ...job,
      jobFunctions: Array.isArray(job.jobFunctions)
        ? job.jobFunctions
        : [job.jobFunctions || { id: 1, name: "Unknown" }],
      isFavorite:
        optimisticUpdates[job.id] !== undefined
          ? optimisticUpdates[job.id]
          : job.isFavorite,
    }));
  }, [favoriteJobs, optimisticUpdates]);

  const selectedJob = useMemo(() => {
    if (selectedJobId) {
      const found = formattedJobs.find((job) => job.id === selectedJobId);
      if (found) return found;
    }

    return formattedJobs.length > 0 ? formattedJobs[0] : null;
  }, [formattedJobs, selectedJobId]);

  const handleSelectJob = (job: Job) => {
    setSelectedJobId(job.id);
  };

  const fetchMoreData = () => {};

  const toggleFavorite = async (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();

    const newFavoriteState = !job.isFavorite;

    setOptimisticUpdates((prev) => ({
      ...prev,
      [job.id]: newFavoriteState,
    }));

    if (job.isFavorite) {
      toast({
        variant: "success",
        title: "Job removed from favorites",
        description: "This job has been removed from your favorites list",
      });
    } else {
      toast({
        variant: "success",
        title: "Job added to favorites",
        description: "This job has been added to your favorites list",
      });
    }

    try {
      await axios.patch(`/api/jobs/${job.id}/favorite`, {
        isFavorite: newFavoriteState,
      });

      refreshFavorites();

      setTimeout(() => {
        setOptimisticUpdates((prev) => {
          const { [job.id]: _, ...rest } = prev;
          return rest;
        });
      }, 1000);
    } catch (error) {
      console.error("Error toggling favorite:", error);

      setOptimisticUpdates((prev) => {
        const { [job.id]: _, ...rest } = prev;
        return rest;
      });

      toast({
        variant: "destructive",
        title: "Failed to update favorites",
        description: "Please try again later",
      });

      refreshFavorites();
    }
  };

  const PageHeader = () => (
    <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
      <Heart className="h-6 w-6 mr-2 text-red-900 fill-red-900" />
      Your Favorites {!isLoading && `(${favoriteCount})`}
    </h2>
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <PageHeader />
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <PageHeader />
        <div className="text-center py-4 text-red-500">
          Failed to load favorites
        </div>
      </div>
    );
  }

  if (!formattedJobs.length) {
    return (
      <div className="p-4">
        <PageHeader />
        <div className="text-center py-8">
          <Heart
            className="h-12 w-12 mx-auto text-gray-300"
            strokeWidth={1.5}
          />
          <p className="mt-2 text-gray-500">You haven't saved any jobs yet</p>
          <p className="text-gray-500">
            Click the heart icon on jobs to save them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PageHeader />
      <div className="flex flex-col lg:flex-row gap-6">
        <JobList
          jobs={formattedJobs}
          selectedJob={selectedJob}
          setSelectedJob={handleSelectJob}
          hasNextPage={false}
          fetchMoreData={fetchMoreData}
        />
        <div className="hidden lg:block border-r border-gray-200 mx-4"></div>
        {selectedJob && (
          <JobDetail job={selectedJob} toggleFavorite={toggleFavorite} />
        )}
      </div>
    </div>
  );
};

export default FavoriteJobs;
