/*
  Warnings:

  - You are about to drop the `CategoriesOnArticles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CategoriesOnArticles` DROP FOREIGN KEY `CategoriesOnArticles_ArticleId_fkey`;

-- DropForeignKey
ALTER TABLE `CategoriesOnArticles` DROP FOREIGN KEY `CategoriesOnArticles_CategoryId_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `CategoriesOnArticles`;

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
