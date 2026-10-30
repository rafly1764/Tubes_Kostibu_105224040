"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { skemaKos } from "@/lib/skema";
import { cekNamaKosSama, tambahKos } from "@/lib/data";
import { bacaSesi } from "@/lib/sesi";
import type { StatusForm } from "@/lib/status-form";

export async function simpanKos(
  _sebelumnya: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  // Pengecekan sesi masuk ke sini, paling awal sebelum memproses data!
  const sesi = await bacaSesi();
  if (!sesi) {
    return { pesan: "Silakan masuk terlebih dahulu." };
  }

  // Kode lama Anda tetap aman di bawahnya
  const mentah = Object.fromEntries(formData);
  const nilai = {
    nama: String(mentah.nama ?? ""),
    tipe: String(mentah.tipe ?? ""),
    deskripsi: String(mentah.deskripsi ?? "")
  };

  const hasil = skemaKos.safeParse(mentah);
  
  if (!hasil.success) {
    return {
      galat: z.flattenError(hasil.error).fieldErrors,
      pesan: "Periksa kembali isian formulir.",
      nilai
    };
  }

  if (cekNamaKosSama(hasil.data.nama)) {
    return {
      galat: { nama: ["Nama kos ini sudah terdaftar"] },
      nilai
    };
  }

  let idKosBaru;
  
  try {
    const kosBaru = tambahKos(hasil.data);
    idKosBaru = kosBaru.id;
  } catch {
    return { pesan: "Gagal menyimpan data kos. Coba lagi.", nilai };
  }

  revalidatePath("/kos");
  redirect(`/kos/${idKosBaru}`);
}