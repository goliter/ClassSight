/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."admins" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" VARCHAR(100) NOT NULL DEFAULT 'admin@example.com',
ADD COLUMN     "name" VARCHAR(50) NOT NULL DEFAULT 'Admin',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."students" ADD COLUMN     "class" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departmentId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "email" VARCHAR(100) NOT NULL DEFAULT 'student@example.com',
ADD COLUMN     "enrollmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "grade" VARCHAR(20) NOT NULL DEFAULT '',
ADD COLUMN     "major" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN     "name" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "phone" VARCHAR(20),
ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."teachers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departmentId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "email" VARCHAR(100) NOT NULL DEFAULT 'teacher@example.com',
ADD COLUMN     "hireDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "office" VARCHAR(100),
ADD COLUMN     "phone" VARCHAR(20),
ADD COLUMN     "rank" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."departments" (
    "id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."courses" (
    "id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT '',
    "code" VARCHAR(20) NOT NULL DEFAULT '',
    "teacherId" TEXT NOT NULL DEFAULT '',
    "departmentId" TEXT NOT NULL DEFAULT '',
    "credits" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "schedule" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."course_enrollments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL DEFAULT '',
    "courseId" TEXT NOT NULL DEFAULT '',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) NOT NULL DEFAULT 'enrolled',

    CONSTRAINT "course_enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_id_key" ON "public"."departments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "public"."departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "courses_id_key" ON "public"."courses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "public"."courses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "course_enrollments_studentId_courseId_key" ON "public"."course_enrollments"("studentId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "public"."students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "public"."teachers"("email");

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."teachers" ADD CONSTRAINT "teachers_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."courses" ADD CONSTRAINT "courses_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."teachers"("teacherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."courses" ADD CONSTRAINT "courses_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course_enrollments" ADD CONSTRAINT "course_enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."students"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course_enrollments" ADD CONSTRAINT "course_enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
