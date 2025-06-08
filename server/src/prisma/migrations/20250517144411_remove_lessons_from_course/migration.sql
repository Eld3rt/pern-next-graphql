/*
  Warnings:

  - You are about to drop the column `courseId` on the `lessons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_courseId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_topicId_fkey";

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "courseId",
ALTER COLUMN "topicId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
