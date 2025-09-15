/*
  Warnings:

  - The primary key for the `post_localizations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `post_localizations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "post_localizations_postId_key";

-- AlterTable
ALTER TABLE "post_localizations" DROP CONSTRAINT "post_localizations_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "post_localizations_pkey" PRIMARY KEY ("postId");
