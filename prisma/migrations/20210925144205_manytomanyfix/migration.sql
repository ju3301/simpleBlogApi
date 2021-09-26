/*
  Warnings:

  - You are about to drop the `ArticlesOnCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ArticlesOnCategories` DROP FOREIGN KEY `ArticlesOnCategories_ArticleId_fkey`;

-- DropForeignKey
ALTER TABLE `ArticlesOnCategories` DROP FOREIGN KEY `ArticlesOnCategories_CategoryId_fkey`;

-- DropTable
DROP TABLE `ArticlesOnCategories`;

-- CreateTable
CREATE TABLE `_ArticleToCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArticleToCategory_AB_unique`(`A`, `B`),
    INDEX `_ArticleToCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ArticleToCategory` ADD FOREIGN KEY (`A`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToCategory` ADD FOREIGN KEY (`B`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
