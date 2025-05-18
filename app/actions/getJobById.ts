"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getJobById(id: number) {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        jobFunctions: true,
      },
    });
    return job;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw new Error("Failed to fetch job data");
  } finally {
    await prisma.$disconnect();
  }
}
