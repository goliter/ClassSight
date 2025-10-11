-- AlterTable
ALTER TABLE "public"."admins" ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "public"."students" ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."teachers" ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 1;
