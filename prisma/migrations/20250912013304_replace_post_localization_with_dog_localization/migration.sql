/*
  Warnings:

  - You are about to drop the `post_localizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post_localizations" DROP CONSTRAINT "post_localizations_post_id_fkey";

-- DropTable
DROP TABLE "post_localizations";

-- CreateTable
CREATE TABLE "dog_localizations" (
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "dog_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dog_localizations_pkey" PRIMARY KEY ("dog_id")
);

-- AddForeignKey
ALTER TABLE "dog_localizations" ADD CONSTRAINT "dog_localizations_dog_id_fkey" FOREIGN KEY ("dog_id") REFERENCES "dogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
