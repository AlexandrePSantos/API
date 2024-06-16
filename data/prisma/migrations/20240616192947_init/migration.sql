/*
  Warnings:

  - Added the required column `iduser` to the `obs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "obs" ADD COLUMN     "iduser" INTEGER NOT NULL;
