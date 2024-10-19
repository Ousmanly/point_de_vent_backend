-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CAISSIER');

-- CreateTable
CREATE TABLE "Utilisateurs" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "mot_de_pass" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "email" TEXT NOT NULL,

    CONSTRAINT "Utilisateurs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateurs_email_key" ON "Utilisateurs"("email");
