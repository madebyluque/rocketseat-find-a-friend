/*
  Warnings:

  - The values [Adult] on the enum `Age` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Age_new" AS ENUM ('PUPPY', 'ADULT');
ALTER TABLE "pets" ALTER COLUMN "age" TYPE "Age_new" USING ("age"::text::"Age_new");
ALTER TYPE "Age" RENAME TO "Age_old";
ALTER TYPE "Age_new" RENAME TO "Age";
DROP TYPE "Age_old";
COMMIT;
