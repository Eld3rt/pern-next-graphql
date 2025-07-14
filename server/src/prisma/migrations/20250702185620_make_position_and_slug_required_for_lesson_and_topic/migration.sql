/*
  Warnings:

  - Made the column `position` on table `Topic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `lessons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "position" SET NOT NULL;

-- AlterTable
ALTER TABLE "lessons" ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "position" SET NOT NULL;
