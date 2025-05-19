import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  education: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution is required"),
        degree_type: z.string().min(1, "Degree type is required"),
        degree_name: z.string().min(1, "Degree name is required"),
        year_start: z
          .number()
          .min(1900, "Invalid year")
          .max(2100, "Invalid year"),
        year_end: z
          .number()
          .min(1900, "Invalid year")
          .max(2100, "Invalid year"),
      })
    )
    .min(1, "At least one education entry is required")
    .max(5, "Maximum of 5 education entries allowed"),
  work_experience: z
    .array(
      z.object({
        organization: z.string().min(1, "Organization is required"),
        job_title: z.string().min(1, "Job title is required"),
        year_start: z
          .number()
          .min(1900, "Invalid year")
          .max(2100, "Invalid year"),
        year_end: z
          .number()
          .min(1900, "Invalid year")
          .max(2100, "Invalid year"),
      })
    )
    .min(1, "At least one work experience entry is required")
    .max(5, "Maximum of 5 work experience entries allowed"),
  job: z
    .object({
      id: z.number().optional(),
      title: z.string().optional(),
      companyName: z.string().nullable().optional(),
      seniority: z.string().nullable().optional(),
      employmentType: z.string().nullable().optional(),
      location: z.string().nullable().optional(),
      jobFunctions: z
        .array(
          z.object({
            name: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
});
