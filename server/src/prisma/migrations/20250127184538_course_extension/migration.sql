/*
  Warnings:

  - You are about to drop the column `videoURL` on the `lessons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageURL]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[videoId]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reducedPrice` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `videoDuration` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageURL" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reducedPrice" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "videoURL",
ADD COLUMN     "videoDuration" INTEGER NOT NULL,
ADD COLUMN     "videoId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseToTag_B_index" ON "_CourseToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "courses_imageURL_key" ON "courses"("imageURL");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_videoId_key" ON "lessons"("videoId");

-- AddForeignKey
ALTER TABLE "_CourseToTag" ADD CONSTRAINT "_CourseToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTag" ADD CONSTRAINT "_CourseToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddCheckConstraint
ALTER TABLE "courses" ADD CONSTRAINT "price_greater_than_reduced_price" CHECK ("price" > "reducedPrice");
