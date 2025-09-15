-- CreateTable
CREATE TABLE "dog_images" (
    "id" SERIAL NOT NULL,
    "image_data" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "filename" TEXT,
    "size" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "dog_id" INTEGER NOT NULL,

    CONSTRAINT "dog_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dog_images" ADD CONSTRAINT "dog_images_dog_id_fkey" FOREIGN KEY ("dog_id") REFERENCES "dogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
