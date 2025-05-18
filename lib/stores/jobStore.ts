import { create } from "zustand";

// Define the job data interface based on the Prisma schema
interface JobData {
  id: number;
  title: string;
  seniority: string | null;
  employmentType: string | null;
  location: string | null;
  companyName: string | null;
  jobFunctions: { name: string }[];
}

interface JobStore {
  jobData: JobData | null;
  setJobData: (data: JobData) => void;
  clearJobData: () => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobData: null,
  setJobData: (data) => set({ jobData: data }),
  clearJobData: () => set({ jobData: null }),
}));


export type { JobData };
