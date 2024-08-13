-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORG');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'Adult');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "EnergyLevels" AS ENUM ('SMALL', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "IndependencyLevels" AS ENUM ('SMALL', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "EnvironmentSizesNeeded" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ORG',

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionRequirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "AdoptionRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "energy_level" "EnergyLevels" NOT NULL,
    "size" "Size" NOT NULL,
    "independency_level" "IndependencyLevels" NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "environment_needed" "EnvironmentSizesNeeded" NOT NULL,
    "city" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_whatsapp_key" ON "orgs"("whatsapp");

-- AddForeignKey
ALTER TABLE "AdoptionRequirements" ADD CONSTRAINT "AdoptionRequirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
