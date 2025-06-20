/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Directory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentId` to the `Directory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Directory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Directory` ADD COLUMN `parentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `path` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Directory_path_key` ON `Directory`(`path`);
