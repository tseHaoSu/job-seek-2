/*
  Warnings:

  - You are about to drop the column `questionId` on the `sections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_questionId_fkey";

-- AlterTable
ALTER TABLE "sections" DROP COLUMN "questionId",
ADD COLUMN     "questionAnswer" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "questionExplanation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "questionText" TEXT NOT NULL DEFAULT '';
