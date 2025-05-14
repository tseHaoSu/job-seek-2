/*
  Warnings:

  - You are about to drop the column `name` on the `modules` table. All the data in the column will be lost.
  - Added the required column `title` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modules" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sections" ADD COLUMN     "questionSubimage" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "steps" ADD COLUMN     "subimage" TEXT;
