import { z } from "zod";
import { formSchema } from "./schema";
import { JobData } from "@/lib/stores/jobStore";

export type ResumeData = z.infer<typeof formSchema>;

export type EducationEntry = {
  institution: string;
  degree_type: string;
  degree_name: string;
  year_start: number;
  year_end: number;
};

 
export type WorkExperienceEntry = {
  organization: string;
  job_title: string;
  year_start: number;
  year_end: number;
};


export type JobFunction = {
  name: string;
};


export type { JobData };
