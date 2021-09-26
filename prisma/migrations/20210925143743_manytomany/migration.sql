/*
  Warnings:

  - You are about to drop the `_ArticleToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ArticleToCategory` DROP FOREIGN KEY `_ArticleToCategory_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ArticleToCategory` DROP FOREIGN KEY `_ArticleToCategory_ibfk_2`;

-- DropIndex
DROP INDEX `Category_id_key` ON `Category`;

-- DropTable
DROP TABLE `_ArticleToCategory`;

-- CreateTable
CREATE TABLE `ArticlesOnCategories` (
    `CategoryId` INTEGER NOT NULL,
    `ArticleId` INTEGER NOT NULL,

    PRIMARY KEY (`CategoryId`, `ArticleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArticlesOnCategories` ADD CONSTRAINT `ArticlesOnCategories_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticlesOnCategories` ADD CONSTRAINT `ArticlesOnCategories_ArticleId_fkey` FOREIGN KEY (`ArticleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
