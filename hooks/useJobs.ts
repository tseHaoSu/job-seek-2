// hooks/useJobs.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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

interface JobsResponse {
  jobs: Job[];
  nextCursor: number | null;
  totalCount: number;
}

const fetchJobs = async (
  page: number,
  searchParams: URLSearchParams
): Promise<JobsResponse> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());

  const search = searchParams.get("search");
  const location = searchParams.get("location");
  const jobType = searchParams.get("jobType");

  if (search) params.append("search", search);
  if (location) params.append("location", location);
  if (jobType) params.append("jobType", jobType);

  const response = await axios.get("/api/jobs", { params });
  return response.data;
};

export function useJobs() {
  const searchParams = useSearchParams();
  return useInfiniteQuery({
    queryKey: ["jobs", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchJobs(pageParam, searchParams),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
}
