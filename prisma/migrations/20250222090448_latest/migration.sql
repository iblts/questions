/*
  Warnings:

  - The primary key for the `CardProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CardProgress` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `CardProgress` table. All the data in the column will be lost.
  - The primary key for the `ModuleProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ModuleProgress` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CardProgress` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `ModuleProgress` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "CardProgress" DROP CONSTRAINT "CardProgress_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardProgress" DROP CONSTRAINT "CardProgress_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleProgress" DROP CONSTRAINT "ModuleProgress_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleProgress" DROP CONSTRAINT "ModuleProgress_userId_fkey";

-- AlterTable
ALTER TABLE "CardProgress" DROP CONSTRAINT "CardProgress_pkey",
DROP COLUMN "id",
DROP COLUMN "moduleId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "stage" DROP DEFAULT,
ADD CONSTRAINT "CardProgress_pkey" PRIMARY KEY ("userId", "cardId");

-- AlterTable
ALTER TABLE "ModuleProgress" DROP CONSTRAINT "ModuleProgress_pkey",
DROP COLUMN "id",
ALTER COLUMN "userId" SET NOT NULL,
ADD CONSTRAINT "ModuleProgress_pkey" PRIMARY KEY ("userId", "moduleId");

-- AlterTable
ALTER TABLE "_CategoryToModule" ADD CONSTRAINT "_CategoryToModule_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryToModule_AB_unique";

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardProgress" ADD CONSTRAINT "CardProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardProgress" ADD CONSTRAINT "CardProgress_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
