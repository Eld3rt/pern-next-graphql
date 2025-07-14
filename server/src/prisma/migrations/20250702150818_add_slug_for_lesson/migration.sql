/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "lessons_slug_key" ON "lessons"("slug");
