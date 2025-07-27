/*
  Warnings:

  - A unique constraint covering the columns `[videoURL]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "videoURL" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "lessons_videoURL_key" ON "lessons"("videoURL");
