-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_topicId_fkey";

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "courseId" INTEGER NOT NULL,
ALTER COLUMN "topicId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

