/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idtype` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `iduser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `authtoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `localbackup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `state` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `synclog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usertype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_idtype_fkey";

-- DropForeignKey
ALTER TABLE "authtoken" DROP CONSTRAINT "authtoken_iduser_fkey";

-- DropForeignKey
ALTER TABLE "localbackup" DROP CONSTRAINT "localbackup_iduser_fkey";

-- DropForeignKey
ALTER TABLE "permission" DROP CONSTRAINT "permission_idtype_fkey";

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

-- DropIndex
DROP INDEX "idx_user_email";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "idtype",
DROP COLUMN "iduser",
ADD COLUMN     "idType" INTEGER NOT NULL,
ADD COLUMN     "idUser" SERIAL NOT NULL,
ALTER COLUMN "last_login" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("idUser");

-- DropTable
DROP TABLE "authtoken";

-- DropTable
DROP TABLE "localbackup";

-- DropTable
DROP TABLE "permission";

-- DropTable
DROP TABLE "project";

-- DropTable
DROP TABLE "state";

-- DropTable
DROP TABLE "synclog";

-- DropTable
DROP TABLE "task";

-- DropTable
DROP TABLE "usertype";

-- CreateTable
CREATE TABLE "UserType" (
    "idType" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("idType")
);

-- CreateTable
CREATE TABLE "State" (
    "idState" SERIAL NOT NULL,
    "state" VARCHAR(50) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("idState")
);

-- CreateTable
CREATE TABLE "Project" (
    "idProject" SERIAL NOT NULL,
    "nameProject" VARCHAR(100) NOT NULL,
    "startDateP" TIMESTAMP(3),
    "endDateP" TIMESTAMP(3),
    "idState" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "completionStatus" BOOLEAN NOT NULL DEFAULT false,
    "performanceReview" TEXT,
    "obs" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("idProject")
);

-- CreateTable
CREATE TABLE "Task" (
    "idTask" SERIAL NOT NULL,
    "nameTask" VARCHAR(100) NOT NULL,
    "startDateT" TIMESTAMP(3),
    "endDateT" TIMESTAMP(3),
    "idProject" INTEGER NOT NULL,
    "idState" INTEGER NOT NULL,
    "photo" TEXT,
    "timeSpend" TIMESTAMP(3),
    "local" VARCHAR(100),
    "taxes" DECIMAL(10,2),
    "completionRate" DECIMAL(5,2),
    "photos" TEXT,
    "observations" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("idTask")
);

-- CreateTable
CREATE TABLE "Permission" (
    "idPermission" SERIAL NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "can_create_project" BOOLEAN,
    "can_edit_project" BOOLEAN,
    "can_delete_project" BOOLEAN,
    "can_manage_users" BOOLEAN,
    "can_assign_tasks" BOOLEAN,
    "can_export_stats" BOOLEAN,
    "idType" INTEGER NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("idPermission")
);

-- CreateTable
CREATE TABLE "SyncLog" (
    "idLog" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("idLog")
);

-- CreateTable
CREATE TABLE "LocalBackup" (
    "idBackup" SERIAL NOT NULL,
    "data" BYTEA NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "LocalBackup_pkey" PRIMARY KEY ("idBackup")
);

-- CreateTable
CREATE TABLE "AuthToken" (
    "idToken" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("idToken")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idType_fkey" FOREIGN KEY ("idType") REFERENCES "UserType"("idType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_idState_fkey" FOREIGN KEY ("idState") REFERENCES "State"("idState") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "Project"("idProject") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_idState_fkey" FOREIGN KEY ("idState") REFERENCES "State"("idState") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_idType_fkey" FOREIGN KEY ("idType") REFERENCES "UserType"("idType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncLog" ADD CONSTRAINT "SyncLog_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalBackup" ADD CONSTRAINT "LocalBackup_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
