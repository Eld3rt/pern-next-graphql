/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[position]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "position" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Topic_position_key" ON "Topic"("position");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_position_key" ON "lessons"("position");
