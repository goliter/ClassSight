/*
  Warnings:

  - You are about to drop the column `major` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."students" DROP COLUMN "major",
ADD COLUMN     "majorId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."teachers" ADD COLUMN     "majorIds" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "public"."majors" (
    "id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "description" TEXT,
    "departmentId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "majors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_MajorToTeacher" (
    "A" VARCHAR(20) NOT NULL,
    "B" VARCHAR(20) NOT NULL,

    CONSTRAINT "_MajorToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "majors_id_key" ON "public"."majors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "majors_code_key" ON "public"."majors"("code");

-- CreateIndex
CREATE INDEX "_MajorToTeacher_B_index" ON "public"."_MajorToTeacher"("B");

-- AddForeignKey
ALTER TABLE "public"."majors" ADD CONSTRAINT "majors_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "public"."majors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MajorToTeacher" ADD CONSTRAINT "_MajorToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."majors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MajorToTeacher" ADD CONSTRAINT "_MajorToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."teachers"("teacherId") ON DELETE CASCADE ON UPDATE CASCADE;
