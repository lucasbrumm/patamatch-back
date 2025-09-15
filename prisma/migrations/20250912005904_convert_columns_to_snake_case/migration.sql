/*
  Warnings:

  - You are about to drop the column `createdAt` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the column `isAdopted` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `dogs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `dogs` table. All the data in the column will be lost.
  - The primary key for the `post_localizations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `post_localizations` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `post_localizations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `post_localizations` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `dogId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `postType` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `posts` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_localizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `post_localizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dogs" DROP CONSTRAINT "dogs_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "post_localizations" DROP CONSTRAINT "post_localizations_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_dogId_fkey";

-- AlterTable
ALTER TABLE "dogs" DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "isAdopted",
DROP COLUMN "ownerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_adopted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "owner_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "post_localizations" DROP CONSTRAINT "post_localizations_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "post_localizations_pkey" PRIMARY KEY ("post_id");

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "dogId",
DROP COLUMN "imageUrl",
DROP COLUMN "postType",
DROP COLUMN "updatedAt",
ADD COLUMN     "author_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dog_id" INTEGER,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "post_type" TEXT NOT NULL DEFAULT 'general',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_dog_id_fkey" FOREIGN KEY ("dog_id") REFERENCES "dogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dogs" ADD CONSTRAINT "dogs_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_localizations" ADD CONSTRAINT "post_localizations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
