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
  job_functions_collection: string[];
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

const MAX_GET_REQUESTS = 200;

export async function POST(request: Request) {
  try {
    const searchQuery = {
      query: {
        bool: {
          must: [{ match: { country: "Australia" } }],
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

    const apiBaseUrl = "https://api.coresignal.com/cdapi/v2";
    const apiKey = process.env.CORESIGNAL_API_KEY || "";

    const authHeaders = {
      "Content-Type": "application/json",
      apikey: apiKey,
      "x-api-key": apiKey,
      Authorization: `Bearer ${apiKey}`,
      "api-key": apiKey,
    };

    // Fetch job IDs
    const postUrl = `${apiBaseUrl}/job_base/search/es_dsl`;
    const jobIdsResponse = await axios.post(postUrl, searchQuery, {
      headers: authHeaders,
    });

    // API returns a direct array of job IDs
    let jobIds = jobIdsResponse.data;

    // Limit to MAX_GET_REQUESTS
    if (jobIds.length > MAX_GET_REQUESTS) {
      jobIds = jobIds.slice(0, MAX_GET_REQUESTS);
    }

    const failedJobs: Array<{ id: string | number; error: string }> = [];
    let jobsWrittenToDb = 0;

    // Process each job ID
    for (let i = 0; i < jobIds.length; i++) {
      const jobId = jobIds[i];

      try {
        // Fetch job details
        const jobDetailUrl = `${apiBaseUrl}/job_base/collect/${jobId}`;
        const jobDetailsResponse = await axios.get(jobDetailUrl, {
          headers: authHeaders,
        });

        const jobData: JobData = jobDetailsResponse.data;

        // Format job data
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
          created: new Date(jobData.created),
          lastUpdated: new Date(jobData.last_updated),
          jobFunctions: jobData.job_functions_collection,
        };

        // Check if job already exists
        const existingJob = await prisma.job.findFirst({
          where: { externalUrl: formattedJob.externalUrl },
        });

        let jobRecord;

        if (existingJob) {
          // Update existing job
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
          // Create new job
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

        // Link job functions
        if (
          jobRecord &&
          formattedJob.jobFunctions &&
          formattedJob.jobFunctions.length > 0
        ) {
          for (const functionName of formattedJob.jobFunctions) {
            const jobFunction = await prisma.jobFunction.upsert({
              where: { name: functionName },
              update: {},
              create: { name: functionName },
            });

            await prisma.job.update({
              where: { id: jobRecord.id },
              data: {
                jobFunctions: {
                  connect: { id: jobFunction.id },
                },
              },
            });
          }
        }

        // Increment counter for successful DB writes
        jobsWrittenToDb++;
        console.log(
          `Job ${jobId} processed successfully. Job ID: ${jobRecord.id}`
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        failedJobs.push({ id: jobId, error: errorMessage });
      }
    }

    return NextResponse.json({
      success: true,
      total: jobIds.length,
      processed: jobIds.length - failedJobs.length,
      failed: failedJobs.length,
      failedJobs: failedJobs,
      jobsWrittenToDb: jobsWrittenToDb,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        success: false,
        total: 0,
        processed: 0,
        failed: 0,
        failedJobs: [],
        jobsWrittenToDb: 0,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
