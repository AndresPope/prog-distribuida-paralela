-- CreateEnum
CREATE TYPE "MedicineType" AS ENUM ('TABLETA', 'JARABE', 'POLVO', 'GOTAS');

-- CreateTable
CREATE TABLE "medicines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "MedicineType" NOT NULL,
    "laboratory" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);
