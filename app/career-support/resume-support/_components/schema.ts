import { z } from "zod";

// Define the schema for form validation
export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      degree_type: z.string().min(1, "Degree type is required"),
      degree_name: z.string().min(1, "Degree name is required"),
      year_start: z
        .number()
        .min(1900, "Invalid year")
        .max(2100, "Invalid year"),
      year_end: z.number().min(1900, "Invalid year").max(2100, "Invalid year"),
    })
  ),
  work_experience: z.array(
    z.object({
      organization: z.string().min(1, "Organization is required"),
      job_title: z.string().min(1, "Job title is required"),
      year_start: z
        .number()
        .min(1900, "Invalid year")
        .max(2100, "Invalid year"),
      year_end: z.number().min(1900, "Invalid year").max(2100, "Invalid year"),
    })
  ),
});
