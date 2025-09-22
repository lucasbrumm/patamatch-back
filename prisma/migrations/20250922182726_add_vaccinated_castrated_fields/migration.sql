-- AlterTable
ALTER TABLE "dogs" ADD COLUMN     "is_castrated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_vaccinated" BOOLEAN NOT NULL DEFAULT false;
