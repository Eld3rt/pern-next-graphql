/*
  Warnings:

  - You are about to drop the column `courseId` on the `CourseProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,courseSlug]` on the table `CourseProgress` will be added. If there are existing duplicate values, this will fail.
  - Made the column `courseSlug` on table `CourseProgress` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CourseProgress" DROP CONSTRAINT "CourseProgress_courseId_fkey";

-- DropIndex
DROP INDEX "CourseProgress_userId_courseId_key";

-- AlterTable
ALTER TABLE "CourseProgress" DROP COLUMN "courseId",
ALTER COLUMN "courseSlug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress_userId_courseSlug_key" ON "CourseProgress"("userId", "courseSlug");

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_courseSlug_fkey" FOREIGN KEY ("courseSlug") REFERENCES "courses"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
