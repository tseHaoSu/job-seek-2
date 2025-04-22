/*
  Warnings:

  - You are about to drop the column `questionText` on the `questions` table. All the data in the column will be lost.
  - Added the required column `question` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "questionText",
ADD COLUMN     "question" TEXT NOT NULL;
