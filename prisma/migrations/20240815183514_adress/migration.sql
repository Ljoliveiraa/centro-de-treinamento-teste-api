-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_addressId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `addressId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
