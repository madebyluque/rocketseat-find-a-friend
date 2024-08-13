/*
  Warnings:

  - Changed the type of `environment_needed` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnvironmentNeededSizes" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "environment_needed",
ADD COLUMN     "environment_needed" "EnvironmentNeededSizes" NOT NULL;

-- DropEnum
DROP TYPE "EnvironmentSizesNeeded";
