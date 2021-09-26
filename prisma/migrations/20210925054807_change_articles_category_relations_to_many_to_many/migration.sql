/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Article` DROP COLUMN `categoryId`;

-- CreateTable
CREATE TABLE `CategoriesOnArticles` (
    `ArticleId` INTEGER NOT NULL,
    `CategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`ArticleId`, `CategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoriesOnArticles` ADD CONSTRAINT `CategoriesOnArticles_ArticleId_fkey` FOREIGN KEY (`ArticleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnArticles` ADD CONSTRAINT `CategoriesOnArticles_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
