-- CreateTable
CREATE TABLE "public"."students" (
    "studentId" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "public"."teachers" (
    "teacherId" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("teacherId")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "adminId" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("adminId")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_studentId_key" ON "public"."students"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_teacherId_key" ON "public"."teachers"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_adminId_key" ON "public"."admins"("adminId");
