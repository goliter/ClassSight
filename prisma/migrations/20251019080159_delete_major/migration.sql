/*
  Warnings:

  - You are about to drop the column `majorId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `majorIds` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the `_MajorToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `majors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_MajorToTeacher" DROP CONSTRAINT "_MajorToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MajorToTeacher" DROP CONSTRAINT "_MajorToTeacher_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."majors" DROP CONSTRAINT "majors_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."students" DROP CONSTRAINT "students_majorId_fkey";

-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "majorId",
ADD COLUMN     "major" VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."teachers" DROP COLUMN "majorIds",
ADD COLUMN     "major" VARCHAR(100) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "public"."_MajorToTeacher";

-- DropTable
DROP TABLE "public"."majors";
