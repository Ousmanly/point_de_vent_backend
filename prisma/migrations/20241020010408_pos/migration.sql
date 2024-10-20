-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CAISSIER');

-- CreateTable
CREATE TABLE "Produits" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(250) NOT NULL,
    "stock" INTEGER NOT NULL,
    "prix" DECIMAL(15,2) NOT NULL,
    "seuil" INTEGER NOT NULL,
    "categorie" VARCHAR(250) NOT NULL,
    "date_ajout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code_barre" VARCHAR(100) NOT NULL,

    CONSTRAINT "Produits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailVentes" (
    "id" SERIAL NOT NULL,
    "montant_total" INTEGER NOT NULL,
    "quantite_vendue" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "venteId" INTEGER NOT NULL,

    CONSTRAINT "DetailVentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ventes" (
    "id" SERIAL NOT NULL,
    "date_vente" TIMESTAMP(3) NOT NULL,
    "utilisateurId" INTEGER NOT NULL,

    CONSTRAINT "Ventes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailReceptions" (
    "id" SERIAL NOT NULL,
    "quantite" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "receptionId" INTEGER NOT NULL,

    CONSTRAINT "DetailReceptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receptions" (
    "id" SERIAL NOT NULL,
    "date_reception" TIMESTAMP(3) NOT NULL,
    "fournisseurId" INTEGER NOT NULL,

    CONSTRAINT "Receptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fournisseurs" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(100) NOT NULL,

    CONSTRAINT "Fournisseurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mouvements" (
    "id" SERIAL NOT NULL,
    "quantite" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "Mouvements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventaires" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "date_maj" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "Inventaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateurs" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "mot_de_pass" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CAISSIER',
    "email" TEXT NOT NULL,

    CONSTRAINT "Utilisateurs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateurs_email_key" ON "Utilisateurs"("email");

-- AddForeignKey
ALTER TABLE "DetailVentes" ADD CONSTRAINT "DetailVentes_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailVentes" ADD CONSTRAINT "DetailVentes_venteId_fkey" FOREIGN KEY ("venteId") REFERENCES "Ventes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventes" ADD CONSTRAINT "Ventes_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailReceptions" ADD CONSTRAINT "DetailReceptions_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailReceptions" ADD CONSTRAINT "DetailReceptions_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Receptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receptions" ADD CONSTRAINT "Receptions_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mouvements" ADD CONSTRAINT "Mouvements_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventaires" ADD CONSTRAINT "Inventaires_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
