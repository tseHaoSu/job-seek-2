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

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const MAX_GET_REQUESTS = 200;

export async function POST(request: Request) {
  console.log("📣 Starting job fetch process...");
  try {
    console.log("🔍 Preparing search query for jobs in Australia");
    const searchQuery = {
      query: {
        bool: {
          must: [{ match: { country: "Australia" } }],
          should: [
            // Software Engineer positions
            { match: { title: "Software Engineer" } },
            { match: { title: "Software Developer" } },
            { match: { title: "Full Stack Developer" } },
            { match: { title: "Backend Developer" } },
            { match: { title: "Backend Engineer" } },
            { match: { title: "Frontend Developer" } },
            { match: { title: "Frontend Engineer" } },
            { match: { title: "DevOps Engineer" } },

            // Data-related positions
            { match: { title: "Data Engineer" } },
            { match: { title: "Data Scientist" } },
            { match: { title: "Data Analyst" } },
            { match: { title: "Business Intelligence" } },
            { match: { title: "Database Administrator" } },
            { match: { title: "Big Data" } },

            // Data and software technologies
            { match: { description: "SQL" } },
            { match: { description: "Python" } },
            { match: { description: "Java" } },
            { match: { description: "JavaScript" } },
            { match: { description: "TypeScript" } },
            { match: { description: "React" } },
            { match: { description: "Node.js" } },
            { match: { description: "Go" } },
            { match: { description: "Rust" } },
            { match: { description: "C#" } },
            { match: { description: "R" } },
            { match: { description: "Tableau" } },
            { match: { description: "Power BI" } },
            { match: { description: "Hadoop" } },
            { match: { description: "Spark" } },
            { match: { description: "AWS" } },
            { match: { description: "Azure" } },
            { match: { description: "GCP" } },
            { match: { description: "ETL" } },
            { match: { description: "Machine Learning" } },
            { match: { description: "Data Warehouse" } },
            { match: { description: "Data Lake" } },
            { match: { description: "MongoDB" } },
            { match: { description: "PostgreSQL" } },
            { match: { description: "Snowflake" } },
            { match: { description: "Databricks" } },
            { match: { description: "dbt" } },
            { match: { description: "Airflow" } },
          ],
          minimum_should_match: 2, 
        },
      },
    };

    const apiBaseUrl = "https://api.coresignal.com/cdapi/v2";
    const apiKey = process.env.CORESIGNAL_API_KEY || "";
    console.log("🔑 API configuration ready");

    const authHeaders = {
      "Content-Type": "application/json",
      apikey: apiKey,
      "x-api-key": apiKey,
      Authorization: `Bearer ${apiKey}`,
      "api-key": apiKey,
    };

    // Fetch job IDs
    console.log("🌐 Sending search request to API...");
    const postUrl = `${apiBaseUrl}/job_base/search/es_dsl`;
    const jobIdsResponse = await axios.post(postUrl, searchQuery, {
      headers: authHeaders,
    });

    // API returns a direct array of job IDs
    let jobIds = jobIdsResponse.data;
    console.log(`✅ Received ${jobIds.length} job IDs from API`);

    // Limit to MAX_GET_REQUESTS
    if (jobIds.length > MAX_GET_REQUESTS) {
      console.log(
        `⚠️ Limiting to ${MAX_GET_REQUESTS} jobs (out of ${jobIds.length} available)`
      );
      jobIds = jobIds.slice(0, MAX_GET_REQUESTS);
    }

    const failedJobs: Array<{ id: string | number; error: string }> = [];
    let jobsWrittenToDb = 0;

    // Process each job ID
    console.log("🔄 Starting to process individual jobs...");
    for (let i = 0; i < jobIds.length; i++) {
      const jobId = jobIds[i];
      console.log(`📋 Processing job ID ${jobId} (${i + 1}/${jobIds.length})`);

      if (i > 0) {
        console.log(`⏱️ Waiting 2 seconds before next request...`);
        await delay(1000); 
      }

      try {
        // Fetch job details
        console.log(`🔍 Fetching details for job ID ${jobId}...`);
        const jobDetailUrl = `${apiBaseUrl}/job_base/collect/${jobId}`;
        const jobDetailsResponse = await axios.get(jobDetailUrl, {
          headers: authHeaders,
        });

        const jobData: JobData = jobDetailsResponse.data;
        console.log(
          `✅ Received data for job: "${jobData.title}" at ${jobData.company_name}`
        );

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
        console.log(`🔍 Checking if job already exists in database...`);
        const existingJob = await prisma.job.findFirst({
          where: { externalUrl: formattedJob.externalUrl },
        });

        let jobRecord;

        if (existingJob) {
          console.log(
            `🔄 Updating existing job record with ID: ${existingJob.id}`
          );
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
          console.log(`➕ Creating new job record for ${formattedJob.title}`);
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
          console.log(
            `🔗 Linking ${formattedJob.jobFunctions.length} job functions to job record`
          );
          for (const functionName of formattedJob.jobFunctions) {
            console.log(`  - Processing job function: ${functionName}`);
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
          `✅ Job successfully processed and saved to database (total: ${jobsWrittenToDb})`
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(`❌ Error processing job ID ${jobId}: ${errorMessage}`);
        failedJobs.push({ id: jobId, error: errorMessage });
      }
    }

    console.log(`📊 Process summary:`);
    console.log(`- Total jobs found: ${jobIds.length}`);
    console.log(`- Jobs processed: ${jobIds.length - failedJobs.length}`);
    console.log(`- Jobs written to DB: ${jobsWrittenToDb}`);
    console.log(`- Failed jobs: ${failedJobs.length}`);

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
    console.error(`❌ FATAL ERROR: ${errorMessage}`);
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
