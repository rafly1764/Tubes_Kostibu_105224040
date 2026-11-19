"use server";

import { z } from "zod";
import { prisma } from "../lib/prisma"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- VALIDASI ZOD (Versi Aman TypeScript) ---
const opsiTipeKos = ["Putra", "Putri", "Campuran"] as const; // Memastikan array terkunci
const skemaKos = z.object({
  nama: z.string().trim().min(3, "Nama kos minimal 3 karakter."),
  tipe: z.enum(opsiTipeKos), // Tanpa parameter kedua agar tidak bentrok
  deskripsi: z.string().trim().max(100, "Deskripsi maksimal 100 karakter."),
});

export type StatusForm = {
  pesan?: string;
  galat?: Record<string, string[]>;
};

// 1. CREATE (Tambah Kos)
export async function tambahKos(state: StatusForm, formData: FormData): Promise<StatusForm> {
  const hasil = skemaKos.safeParse({
    nama: formData.get("nama"),
    tipe: formData.get("tipe"),
    deskripsi: formData.get("deskripsi"),
  });
  
  if (!hasil.success) {
    const erorFormat: Record<string, string[]> = {};
    hasil.error.issues.forEach((issue) => {
      const path = issue.path[0] as string;
      if (!erorFormat[path]) {
        erorFormat[path] = [];
      }
      erorFormat[path].push(issue.message);
    });

    return { galat: erorFormat };
  }

  try {
    await prisma.kos.create({
      data: {
        nama: hasil.data.nama,
        tipe: hasil.data.tipe,
        deskripsi: hasil.data.deskripsi,
        tersedia: true,
      },
    });
  } catch (error) { // <-- Dihapus titik duanya (: any)
    console.error("Galat Tambah Kos:", error);
    
    // Kembali menggunakan metode penanganan galat asli dari Anda
    const err = error as { code?: string };
    if (err.code === "P2002") {
      return { pesan: "Gagal: Nama Kos ini sudah terdaftar!" }; 
    }
    return { pesan: "Terjadi kesalahan sistem saat menyimpan." };
  }

  revalidatePath("/");
  redirect("/dashboard"); 
}

// 2. READ (Tampil Semua Kos)
export async function getSemuaKos() {
  return await prisma.kos.findMany({
    orderBy: { dibuatPada: "desc" }, 
  });
}

// 3. UPDATE (Ubah Tipe Kos)
export async function ubahKos(id: number, tipeBaru: "Putra" | "Putri" | "Campuran") {
  try {
    await prisma.kos.update({
      where: { id },
      data: { tipe: tipeBaru },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Galat Ubah Kos:", error);
    return { error: "Gagal mengubah tipe Kos." };
  }
}

// 4. DELETE (Hapus Kos dengan Transaksi)
export async function hapusKos(id: number) {
  try {
    await prisma.$transaction([
      prisma.ulasan.deleteMany({ where: { kosId: id } }),
      prisma.kos.delete({ where: { id } })
    ]);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Galat Hapus Kos:", error);
    return { error: "Gagal menghapus Kos." };
  }
}