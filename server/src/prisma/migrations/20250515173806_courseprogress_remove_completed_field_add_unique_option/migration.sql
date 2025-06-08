/*
  Warnings:

  - You are about to drop the column `completed` on the `CourseProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,courseId]` on the table `CourseProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CourseProgress" DROP COLUMN "completed";

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress_userId_courseId_key" ON "CourseProgress"("userId", "courseId");
