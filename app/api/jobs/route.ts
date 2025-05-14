// app/api/jobs/route.ts
import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import { Job, JobFunction, Prisma } from "@prisma/client";

// Define types for response objects
interface FormattedJob extends Omit<Job, "jobFunctions"> {
  jobFunctions: string[];
}

interface PaginationMetadata {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

interface JobsResponse {
  jobs: FormattedJob[];
  pagination: PaginationMetadata;
}

export async function GET(
  request: Request
): Promise<NextResponse<JobsResponse | { error: string }>> {
  try {
    // Get URL parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const search = url.searchParams.get("search") || "";

    // Calculate pagination values
    const skip = (page - 1) * pageSize;

    // Create where clause for filtering
    const where: Prisma.JobWhereInput = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { companyName: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Get total count for pagination
    const totalCount = await prisma.job.count({ where });

    // Get jobs with their functions
    const jobs = await prisma.job.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { created: "desc" },
      include: {
        jobFunctions: true,
      },
    });

    // Type for job with included jobFunctions
    type JobWithFunctions = Job & {
      jobFunctions: JobFunction[];
    };

    // Map the response to include job functions as an array of strings
    const formattedJobs: FormattedJob[] = jobs.map((job: JobWithFunctions) => ({
      ...job,
      jobFunctions: job.jobFunctions.map((func) => func.name),
    }));

    // Return paginated results with metadata
    return NextResponse.json({
      jobs: formattedJobs,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        hasMore: page * pageSize < totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
