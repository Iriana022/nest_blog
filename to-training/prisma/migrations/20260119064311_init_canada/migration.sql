-- CreateTable
CREATE TABLE "Brique" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tache" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'A faire',

    CONSTRAINT "Brique_pkey" PRIMARY KEY ("id")
);
