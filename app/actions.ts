"use server";

import { prisma } from "../lib/prisma"; 
import { revalidatePath } from "next/cache";

// 1. CREATE (Tambah Kos - Dilengkapi penanganan galat P2002)
export async function tambahKos(formData: FormData) {
  const nama = formData.get("nama") as string;
  const tipe = formData.get("tipe") as "Putra" | "Putri" | "Campuran";
  const deskripsi = formData.get("deskripsi") as string;

  try {
    await prisma.kos.create({
      data: {
        nama,
        tipe,
        deskripsi,
        tersedia: true,
      },
    });
    revalidatePath("/"); // Memuat ulang halaman web agar data baru langsung muncul
    return { success: true };
  } catch (error) {
    console.error("Galat Tambah Kos:", error); // Menghilangkan garis kuning
    
    // Skenario Pengujian 2: Memicu galat Unique Constraint
    const err = error as { code?: string };
    if (err.code === "P2002") {
      return { error: "Gagal: Nama Kos ini sudah terdaftar!" }; 
    }
    return { error: "Terjadi kesalahan sistem saat menyimpan." };
  }
}

// 2. READ (Tampil Semua Kos)
export async function getSemuaKos() {
  return await prisma.kos.findMany({
    orderBy: { dibuatPada: "desc" }, // Mengurutkan dari yang terbaru
  });
}

// 3. UPDATE (Ubah Tipe Kos - Skenario Pengujian 4)
export async function ubahKos(id: number, tipeBaru: "Putra" | "Putri" | "Campuran") {
  try {
    await prisma.kos.update({
      where: { id },
      data: { tipe: tipeBaru },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Galat Ubah Kos:", error); // Menghilangkan garis kuning
    return { error: "Gagal mengubah tipe Kos." };
  }
}

// 4. DELETE (Hapus Kos dengan Transaksi - Menjawab Modul Bagian 5)
export async function hapusKos(id: number) {
  try {
    // Transaksi: Hapus ulasannya dulu, baru hapus data kosnya
    await prisma.$transaction([
      prisma.ulasan.deleteMany({ where: { kosId: id } }),
      prisma.kos.delete({ where: { id } })
    ]);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Galat Hapus Kos:", error); // Menghilangkan garis kuning
    return { error: "Gagal menghapus Kos." };
  }
}