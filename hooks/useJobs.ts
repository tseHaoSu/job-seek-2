// hooks/useJobs.ts
import { useInfiniteQuery } from "@tanstack/react-query";

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
  jobFunction: { id: number; name: string }
}

interface JobsResponse {
  jobs: Job[];
  nextCursor: number | null;
  totalCount: number;
}

const fetchJobs = async (page: number): Promise<JobsResponse> => {
  const response = await fetch(`/api/jobs?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
};

export function useJobs() {
  return useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: ({ pageParam = 1 }) => fetchJobs(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
  });
}
