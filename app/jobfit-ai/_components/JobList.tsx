"use client";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Job } from "./types";
import JobListItem from "./JobListItem";

interface JobListProps {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (job: Job) => void;
  hasNextPage: boolean | undefined;
  fetchMoreData: () => void;
}

const JobList = ({
  jobs,
  selectedJob,
  setSelectedJob,
  hasNextPage,
  fetchMoreData,
}: JobListProps) => {
  return (
    <div className="w-full lg:w-2/5 pt-5">
      <h2 className="text-xs font-bold mb-4 text-gray-800">
        Available jobs 
      </h2>
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
              <JobListItem
                key={job.id}
                job={job}
                isSelected={selectedJob?.id === job.id}
                onSelect={setSelectedJob}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default JobList;
