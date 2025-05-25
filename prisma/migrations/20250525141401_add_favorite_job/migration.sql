-- CreateTable
CREATE TABLE "favoriteJob" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "favoriteJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "favoriteJob_jobId_idx" ON "favoriteJob"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "favoriteJob_jobId_key" ON "favoriteJob"("jobId");

-- AddForeignKey
ALTER TABLE "favoriteJob" ADD CONSTRAINT "favoriteJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
