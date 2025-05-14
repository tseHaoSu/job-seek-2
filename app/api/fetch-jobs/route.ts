// app/api/fetch-jobs/route.ts
import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import axios from "axios";

interface JobData {
  id: number;
  created: string;
  last_updated: string;
  time_posted: string;
  title: string;
  description: string;
  seniority: string | null;
  employment_type: string | null;
  location: string | null;
  url: string | null;
  external_url: string | null;
  applicants_count: string | null;
  salary: string | null;
  country: string | null;
  hash: string;
  company_id: number;
  company_name: string;
  company_url: string | null;
  deleted: number;
  application_active: number;
  linkedin_job_id: number;
  redirected_url: string;
  job_functions_collection: string[] | Array<{ [key: string]: string }>;
  job_industry_collection: Array<{ job_industry_list: { industry: string } }>;
}

interface FormattedJob {
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
  timePosted: string | null;
  created: Date;
  lastUpdated: Date;
  jobFunctions?: string[];
}

interface ProcessingResult {
  success: boolean;
  total: number;
  processed: number;
  failed: number;
  failedJobs: Array<{ id: string | number; error: string }>;
  jobDetails: Array<FormattedJob>;
}

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const MAX_GET_REQUESTS = 50;

export async function POST(
  request: Request
): Promise<NextResponse<ProcessingResult>> {
  try {
    try {
      const count = await prisma.job.count();
      console.log("Database access test succeeded, job count:", count);
    } catch (e) {
      console.warn("Database test exception:", e);
    }

    const searchQuery = {
      query: {
        bool: {
          must: [
            {
              match: {
                country: "Australia",
              },
            },
          ],
          should: [
            { match: { title: "Next.js" } },
            { match: { description: "Word" } },
            { match: { description: "PowerPoint" } },
            { match: { description: "Excel" } },
            { match: { description: "Acrobat" } },
            { match: { description: "Zoom" } },
            { match: { description: "Teams" } },
            { match: { description: "Meet" } },
            { match: { description: "SEEK" } },
            { match: { description: "LinkedIn" } },
            { match: { description: "Gmail" } },
          ],
          minimum_should_match: 1,
        },
      },
    };

    let jobIds: Array<string | number> = [];
    const apiBaseUrl = "https://api.coresignal.com/cdapi/v2";
    const apiKey = process.env.CORESIGNAL_API_KEY || "";

    const authHeaders = {
      "Content-Type": "application/json",
      apikey: apiKey,
      "x-api-key": apiKey,
      Authorization: `Bearer ${apiKey}`,
      "api-key": apiKey,
    };

    try {
      const postUrl = `${apiBaseUrl}/job_base/search/es_dsl`;
      const jobIdsResponse = await axios.post(postUrl, searchQuery, {
        headers: authHeaders,
      });

      const jobIdsData = jobIdsResponse.data;

      if (Array.isArray(jobIdsData)) {
        jobIds = jobIdsData;
      } else if (jobIdsData.hits?.hits) {
        jobIds = jobIdsData.hits.hits.map((hit) => hit._id);
      } else if (jobIdsData.ids && Array.isArray(jobIdsData.ids)) {
        jobIds = jobIdsData.ids;
      } else if (jobIdsData.jobs && Array.isArray(jobIdsData.jobs)) {
        jobIds = jobIdsData.jobs;
      } else if (jobIdsData.documents && Array.isArray(jobIdsData.documents)) {
        jobIds = jobIdsData.documents.map((doc) => doc.id);
      } else if (jobIdsData.results && Array.isArray(jobIdsData.results)) {
        jobIds = jobIdsData.results.map((result) => result.id);
      } else {
        for (const key in jobIdsData) {
          if (Array.isArray(jobIdsData[key]) && jobIdsData[key].length > 0) {
            const array = jobIdsData[key];
            if (typeof array[0] === "string" || typeof array[0] === "number") {
              jobIds = array;
              break;
            } else if (array[0] && array[0].id) {
              jobIds = array.map((item) => item.id);
              break;
            }
          }
        }
      }

      console.log(`Found ${jobIds.length} job IDs to process`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || "unknown";
        const errorMessage = error.response?.data || error.message;
        throw new Error(
          `Failed to fetch job IDs: ${statusCode} ${JSON.stringify(errorMessage)}`
        );
      } else {
        throw error;
      }
    }

    if (jobIds.length > MAX_GET_REQUESTS) {
      jobIds = jobIds.slice(0, MAX_GET_REQUESTS);
    }

    const processedJobs: Array<string | number> = [];
    const failedJobs: Array<{ id: string | number; error: string }> = [];
    const collectedJobDetails: Array<FormattedJob> = [];

    for (let i = 0; i < jobIds.length; i++) {
      const jobId = jobIds[i];
      try {
        console.log(
          `Fetching details for job ID ${jobId} (${i + 1}/${jobIds.length})`
        );

        if (i > 0) {
          await delay(2000); // 2 seconds delay
        }

        try {
          const jobDetailUrl = `${apiBaseUrl}/job_base/collect/${jobId}`;
          const jobDetailsResponse = await axios.get(jobDetailUrl, {
            headers: authHeaders,
          });

          if (!jobDetailsResponse.data) {
            throw new Error("Received empty response for job details");
          }

          const jobData: JobData = jobDetailsResponse.data;

          let jobFunctions: string[] = [];
          if (
            jobData.job_functions_collection &&
            Array.isArray(jobData.job_functions_collection)
          ) {
            jobFunctions = jobData.job_functions_collection.map((item) => {
              if (typeof item === "string") {
                return item;
              } else {
                const value = Object.values(item)[0];
                return typeof value === "string" ? value : String(value);
              }
            });
          }

          const formattedJob: FormattedJob = {
            title: jobData.title,
            description: jobData.description,
            seniority: jobData.seniority,
            employmentType: jobData.employment_type,
            location: jobData.location,
            url: jobData.url,
            externalUrl: jobData.external_url,
            applicantsCount: jobData.applicants_count,
            salary: jobData.salary,
            country: jobData.country,
            companyName: jobData.company_name,
            companyUrl: jobData.company_url,
            timePosted: jobData.time_posted,
            created: jobData.created ? new Date(jobData.created) : new Date(),
            lastUpdated: jobData.last_updated
              ? new Date(jobData.last_updated)
              : new Date(),
            jobFunctions: jobFunctions,
          };

          collectedJobDetails.push(formattedJob);

          try {
            const existingJob = await prisma.job.findFirst({
              where: {
                externalUrl: formattedJob.externalUrl,
              },
            });

            let jobRecord;

            if (existingJob) {
              jobRecord = await prisma.job.update({
                where: { id: existingJob.id },
                data: {
                  title: formattedJob.title,
                  description: formattedJob.description,
                  seniority: formattedJob.seniority,
                  employmentType: formattedJob.employmentType,
                  location: formattedJob.location,
                  url: formattedJob.url,
                  externalUrl: formattedJob.externalUrl,
                  applicantsCount: formattedJob.applicantsCount,
                  salary: formattedJob.salary,
                  country: formattedJob.country,
                  companyName: formattedJob.companyName,
                  companyUrl: formattedJob.companyUrl,
                  timePosted: formattedJob.timePosted,
                  created: formattedJob.created,
                  lastUpdated: formattedJob.lastUpdated,
                },
              });
            } else {
              jobRecord = await prisma.job.create({
                data: {
                  title: formattedJob.title,
                  description: formattedJob.description,
                  seniority: formattedJob.seniority,
                  employmentType: formattedJob.employmentType,
                  location: formattedJob.location,
                  url: formattedJob.url,
                  externalUrl: formattedJob.externalUrl,
                  applicantsCount: formattedJob.applicantsCount,
                  salary: formattedJob.salary,
                  country: formattedJob.country,
                  companyName: formattedJob.companyName,
                  companyUrl: formattedJob.companyUrl,
                  timePosted: formattedJob.timePosted,
                  created: formattedJob.created,
                  lastUpdated: formattedJob.lastUpdated,
                },
              });
            }

            if (jobRecord && jobFunctions.length > 0) {
              for (const functionName of jobFunctions) {
                const jobFunction = await prisma.jobFunction.upsert({
                  where: { name: functionName },
                  update: {},
                  create: { name: functionName },
                });

                await prisma.job.update({
                  where: { id: jobRecord.id },
                  data: {
                    jobFunctions: {
                      connect: {
                        id: jobFunction.id,
                      },
                    },
                  },
                });
              }
            }
          } catch (dbError) {
            console.warn("Error writing to database:", dbError);
          }

          processedJobs.push(jobId);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const statusCode = error.response?.status || "unknown";
            const errorMessage = error.response?.data || error.message;
            throw new Error(
              `Failed to fetch job details: ${statusCode} ${JSON.stringify(errorMessage)}`
            );
          } else {
            throw error;
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(`Error processing job ID ${jobId}: ${errorMessage}`);
        failedJobs.push({ id: jobId, error: errorMessage });
      }
    }

    return NextResponse.json({
      success: true,
      total: jobIds.length,
      processed: processedJobs.length,
      failed: failedJobs.length,
      failedJobs: failedJobs,
      jobDetails: collectedJobDetails,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Function error: ${errorMessage}`);
    return NextResponse.json(
      {
        success: false,
        total: 0,
        processed: 0,
        failed: 0,
        failedJobs: [],
        jobDetails: [],
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
