/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expiresAt",
ADD COLUMN     "accountOwner" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "collaborator" BOOLEAN DEFAULT false,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "expires" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "userId" BIGINT;
