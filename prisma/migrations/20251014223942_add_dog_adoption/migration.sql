-- CreateTable
CREATE TABLE "dog_adoptions" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dog_id" INTEGER NOT NULL,

    CONSTRAINT "dog_adoptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dog_adoptions_user_id_dog_id_key" ON "dog_adoptions"("user_id", "dog_id");

-- AddForeignKey
ALTER TABLE "dog_adoptions" ADD CONSTRAINT "dog_adoptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dog_adoptions" ADD CONSTRAINT "dog_adoptions_dog_id_fkey" FOREIGN KEY ("dog_id") REFERENCES "dogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
