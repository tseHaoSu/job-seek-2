import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
  jobFunctions: { id: number; name: string }[];
}

interface FavoriteJobsResponse {
  jobs: Job[];
  count: number;
}

const fetchFavoriteJobs = async () => {
  const response = await axios.get("/api/jobs/favorites");
  return response.data;
};

export function useFavoriteJobs() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["favoriteJobs"],
    queryFn: fetchFavoriteJobs,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: false,
  });
  const refreshFavorites = () => {
    queryClient.invalidateQueries({ queryKey: ["favoriteJobs"] });
  };
  return {
    favoriteJobs: data?.jobs || [],
    favoriteCount: data?.count || 0,
    isLoading,
    error,
    refreshFavorites,
  };
}
