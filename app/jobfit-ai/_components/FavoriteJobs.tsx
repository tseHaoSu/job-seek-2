"use client";

import React, { useState, useMemo, useCallback } from "react";
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

  //formattedJobs
  const formattedJobs = useMemo(() => {
    return favoriteJobs.map((job: Job) => ({
      ...job,
      isFavorite:
        optimisticUpdates[job.id] !== undefined
          ? optimisticUpdates[job.id]
          : job.isFavorite,
    }));
  }, [favoriteJobs, optimisticUpdates]);

  const selectedJob = useMemo(() => {
    if (selectedJobId) {
      const found = formattedJobs.find((job: Job) => job.id === selectedJobId);
      if (found) return found;
    }
    return formattedJobs.length > 0 ? formattedJobs[0] : null;
  }, [formattedJobs, selectedJobId]);

  const handleSelectJob = (job: Job) => {
    setSelectedJobId(job.id);
  };
  // const debouncedToggleFavorite = useCallback(
  //   debounce(async (jobId: number, newState: boolean) => {
  //     try {
  //       await axios.patch(`/api/jobs/${jobId}/favorite`, {
  //         isFavorite: newState,
  //       });

  //       // Only refresh favorites if needed
  //       if (!newState) {
  //         refreshFavorites();
  //       }

  //       // Clean up optimistic update
  //       setOptimisticUpdates((prev) => {
  //         const { [jobId]: _, ...rest } = prev;
  //         return rest;
  //       });
  //     } catch (error) {
  //       // Error handling
  //       setOptimisticUpdates((prev) => {
  //         const { [jobId]: _, ...rest } = prev;
  //         return rest;
  //       });

  //       toast({
  //         variant: "destructive",
  //         title: "Failed to update favorites",
  //         description: "Please try again later",
  //       });

  //       refreshFavorites();
  //     }
  //   }, 300),
  //   [refreshFavorites, toast]
  // );

  const toggleFavorite = async (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = !job.isFavorite;

    // Set optimistic update
    setOptimisticUpdates((prev) => ({
      ...prev,
      [job.id]: newFavoriteState,
    }));

    toast({
      variant: "success",
      title: newFavoriteState
        ? "Job added to favorites"
        : "Job removed from favorites",
      description: newFavoriteState
        ? "This job has been added to your favorites list"
        : "This job has been removed from your favorites list",
    });
    try {
      await axios.patch(`/api/jobs/${job.id}/favorite`, {
        isFavorite: newFavoriteState,
      });
      if (!newFavoriteState) {
        refreshFavorites();
      }
      setOptimisticUpdates((prev) => {
        const { [job.id]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
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

  if (isLoading)
    return (
      <div className="p-4">
        <PageHeader />
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="p-4">
        <PageHeader />
        <div className="text-center py-4 text-red-500">
          Failed to load favorites
        </div>
      </div>
    );

  if (!formattedJobs.length)
    return (
      <div className="p-4">
        <PageHeader />
        <div className="text-center py-8">     
          <p className="mt-2 text-gray-500">You haven't saved any jobs yet</p>
        </div>
      </div>
    );

  return (
    <div className="p-4">
      <PageHeader />
      <div className="flex flex-col lg:flex-row gap-6">
        <JobList
          jobs={formattedJobs}
          selectedJob={selectedJob}
          setSelectedJob={handleSelectJob}
          hasNextPage={false}
          fetchMoreData={() => {}}
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
