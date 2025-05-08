import { z } from "zod";
import { formSchema } from "./schema";

// type from zod schema
export type ResumeData = z.infer<typeof formSchema>;

// Education entry 
export type EducationEntry = {
  institution: string;
  degree_type: string;
  degree_name: string;
  year_start: number;
  year_end: number;
};

// Work experience entry 
export type WorkExperienceEntry = {
  organization: string;
  job_title: string;
  year_start: number;
  year_end: number;
};
