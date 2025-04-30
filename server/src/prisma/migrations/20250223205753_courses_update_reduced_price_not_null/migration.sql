/*
  Warnings:

  - Made the column `reducedPrice` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "reducedPrice" SET NOT NULL;

-- EditCheckConstraint
ALTER TABLE "courses"
  DROP CONSTRAINT "price_greater_than_reduced_price",
  ADD CONSTRAINT "price_greater_than_reduced_price" CHECK ("price" >= "reducedPrice");