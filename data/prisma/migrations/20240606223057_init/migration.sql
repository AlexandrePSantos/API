/*
  Warnings:

  - The `timespend` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `idstate` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `iduser` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `completionstatus` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `iduser` on table `synclog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `timestamp` on table `synclog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `action` on table `synclog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `synclog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idproject` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idstate` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idtype` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_idstate_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_iduser_fkey";

-- DropForeignKey
ALTER TABLE "synclog" DROP CONSTRAINT "synclog_iduser_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_idproject_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_idstate_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_idtype_fkey";

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "startdatep" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "enddatep" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "idstate" SET NOT NULL,
ALTER COLUMN "iduser" SET NOT NULL,
ALTER COLUMN "completionstatus" SET NOT NULL;

-- AlterTable
ALTER TABLE "synclog" ALTER COLUMN "iduser" SET NOT NULL,
ALTER COLUMN "timestamp" SET NOT NULL,
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "action" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "startdatet" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "enddatet" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "idproject" SET NOT NULL,
ALTER COLUMN "idstate" SET NOT NULL,
DROP COLUMN "timespend",
ADD COLUMN     "timespend" INTEGER;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "idtype" SET NOT NULL,
ALTER COLUMN "last_login" SET DATA TYPE TIMESTAMP(3);
