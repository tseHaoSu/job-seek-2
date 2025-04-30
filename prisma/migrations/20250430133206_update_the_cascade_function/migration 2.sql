-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_moduleId_fkey";

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
