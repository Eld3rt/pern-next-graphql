/*
  Warnings:

  - Made the column `mainColor` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "mainColor" SET NOT NULL,
ALTER COLUMN "mainColor" SET DEFAULT '#701437';
