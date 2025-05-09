-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "level" TEXT,
ADD COLUMN     "offerMessage" TEXT,
ADD COLUMN     "prerequisites" TEXT;

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "topicId" INTEGER;

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
