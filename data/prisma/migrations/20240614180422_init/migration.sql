/*
  Warnings:

  - You are about to drop the column `observations` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `taxes` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "startdatep" SET DATA TYPE DATE,
ALTER COLUMN "enddatep" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "observations",
DROP COLUMN "photo",
DROP COLUMN "photos",
DROP COLUMN "taxes",
ALTER COLUMN "startdatet" SET DATA TYPE DATE,
ALTER COLUMN "enddatet" SET DATA TYPE DATE;
