-- AlterTable
ALTER TABLE "public"."courses" ADD COLUMN     "studentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" VARCHAR(50) NOT NULL DEFAULT '专业课程';
