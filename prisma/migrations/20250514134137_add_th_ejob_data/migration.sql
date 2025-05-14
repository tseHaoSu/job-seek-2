-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "timePosted" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seniority" TEXT,
    "employmentType" TEXT,
    "location" TEXT,
    "url" TEXT,
    "externalUrl" TEXT,
    "applicantsCount" TEXT,
    "salary" TEXT,
    "country" TEXT,
    "companyName" TEXT,
    "companyUrl" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobFunction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobFunction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobToJobFunction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JobToJobFunction_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobFunction_name_key" ON "JobFunction"("name");

-- CreateIndex
CREATE INDEX "_JobToJobFunction_B_index" ON "_JobToJobFunction"("B");

-- AddForeignKey
ALTER TABLE "_JobToJobFunction" ADD CONSTRAINT "_JobToJobFunction_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToJobFunction" ADD CONSTRAINT "_JobToJobFunction_B_fkey" FOREIGN KEY ("B") REFERENCES "JobFunction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
