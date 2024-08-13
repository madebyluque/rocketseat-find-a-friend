/*
  Warnings:

  - You are about to drop the `AdoptionRequirements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdoptionRequirements" DROP CONSTRAINT "AdoptionRequirements_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "requirements" TEXT[];

-- DropTable
DROP TABLE "AdoptionRequirements";
