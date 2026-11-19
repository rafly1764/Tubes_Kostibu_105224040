-- CreateEnum
CREATE TYPE "TipeKos" AS ENUM ('Putra', 'Putri', 'Campuran');

-- CreateTable
CREATE TABLE "Kos" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tipe" "TipeKos" NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tersedia" BOOLEAN NOT NULL DEFAULT true,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ulasan" (
    "id" SERIAL NOT NULL,
    "namaPenyewa" TEXT NOT NULL,
    "nilai" INTEGER NOT NULL,
    "komentar" TEXT NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kosId" INTEGER NOT NULL,

    CONSTRAINT "Ulasan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kos_nama_key" ON "Kos"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Ulasan_kosId_namaPenyewa_key" ON "Ulasan"("kosId", "namaPenyewa");

-- AddForeignKey
ALTER TABLE "Ulasan" ADD CONSTRAINT "Ulasan_kosId_fkey" FOREIGN KEY ("kosId") REFERENCES "Kos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
