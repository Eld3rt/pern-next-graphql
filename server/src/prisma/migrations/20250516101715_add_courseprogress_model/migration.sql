/*
  Warnings:

  - You are about to drop the `LessonProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LessonProgress" DROP CONSTRAINT "LessonProgress_courseProgressId_fkey";

-- DropForeignKey
ALTER TABLE "LessonProgress" DROP CONSTRAINT "LessonProgress_lessonId_fkey";

-- DropTable
DROP TABLE "LessonProgress";

-- CreateTable
CREATE TABLE "_CourseProgressToLesson" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseProgressToLesson_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseProgressToLesson_B_index" ON "_CourseProgressToLesson"("B");

-- AddForeignKey
ALTER TABLE "_CourseProgressToLesson" ADD CONSTRAINT "_CourseProgressToLesson_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseProgressToLesson" ADD CONSTRAINT "_CourseProgressToLesson_B_fkey" FOREIGN KEY ("B") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
