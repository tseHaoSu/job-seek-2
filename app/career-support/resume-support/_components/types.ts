import { z } from "zod";
import { formSchema } from "./schema";

// Type for the resume data derived from the schema
export type ResumeData = z.infer<typeof formSchema>;

// Education entry type
export type EducationEntry = {
  institution: string;
  degree_type: string;
  degree_name: string;
  year_start: number;
  year_end: number;
};

// Work experience entry type
export type WorkExperienceEntry = {
  organization: string;
  job_title: string;
  year_start: number;
  year_end: number;
};
