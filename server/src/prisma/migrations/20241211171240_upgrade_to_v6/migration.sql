-- AlterTable
ALTER TABLE "_CourseToUser" ADD CONSTRAINT "_CourseToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CourseToUser_AB_unique";
