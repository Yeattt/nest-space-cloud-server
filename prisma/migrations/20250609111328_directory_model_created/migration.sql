/*
  Warnings:

  - Added the required column `directoryId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` ADD COLUMN `directoryId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Directory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_directoryId_fkey` FOREIGN KEY (`directoryId`) REFERENCES `Directory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
