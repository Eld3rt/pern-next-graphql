/*
  Warnings:

  - A unique constraint covering the columns `[smallImageURL]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "smallImageURL" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "courses_smallImageURL_key" ON "courses"("smallImageURL");
