-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADOPTER', 'CREATOR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_type" "UserType" NOT NULL DEFAULT 'ADOPTER';
