-- CreateIndex
CREATE INDEX "Job_created_idx" ON "Job"("created" DESC);

-- CreateIndex
CREATE INDEX "Job_title_idx" ON "Job"("title");

-- CreateIndex
CREATE INDEX "Job_companyName_idx" ON "Job"("companyName");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- CreateIndex
CREATE INDEX "Job_employmentType_idx" ON "Job"("employmentType");

-- CreateIndex
CREATE INDEX "Job_location_employmentType_idx" ON "Job"("location", "employmentType");

-- CreateIndex
CREATE INDEX "Job_location_created_idx" ON "Job"("location", "created" DESC);

-- CreateIndex
CREATE INDEX "Job_employmentType_created_idx" ON "Job"("employmentType", "created" DESC);
