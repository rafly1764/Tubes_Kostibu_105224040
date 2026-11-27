"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { skemaKos, skemaUlasan } from "@/lib/skema";

export type StatusForm = {
  pesan?: string;
  galat?: Partial<Record<string, string[]>>;
};

function ambilKodePrisma(error: unknown): string | undefined {
  if (typeof error === "object" && error !== null && "code" in error) {
    const kode = (error as { code: unknown }).code;
    return typeof kode === "string" ? kode : undefined;
  }
  return undefined;
}

export async function ubahKos(
  id: number,
  _s: StatusForm,
  formData: FormData,
): Promise<StatusForm> {
  const hasil = skemaKos.safeParse(Object.fromEntries(formData));
  if (!hasil.success) {
    return { galat: z.flattenError(hasil.error).fieldErrors };
  }

  await prisma.kos.update({ where: { id }, data: hasil.data });
  revalidatePath("/kos");
  revalidatePath(`/kos/${id}`);
  return { pesan: "Perubahan disimpan." };
}

export async function hapusKos(id: number) {
  try {
    await prisma.kos.delete({ where: { id } });
  } catch (error) {
    const kode = ambilKodePrisma(error);
    if (kode === "P2003") {
      throw new Error(
        "Kos tidak dapat dihapus karena masih memiliki ulasan terkait.",
      );
    }
    if (kode === "P2025") {
      throw new Error(
        "Data kos tidak ditemukan atau sudah dihapus sebelumnya.",
      );
    }
    throw error;
  }

  revalidatePath("/kos");
  redirect("/kos");
}

export async function tambahUlasan(
  kosId: number,
  _s: StatusForm,
  formData: FormData,
): Promise<StatusForm> {
  const hasil = skemaUlasan.safeParse(Object.fromEntries(formData));
  if (!hasil.success) {
    return { galat: z.flattenError(hasil.error).fieldErrors };
  }

  try {
    await prisma.ulasan.create({
      data: {
        kosId,
        namaPenyewa: hasil.data.namaPenyewa,
        komentar: hasil.data.komentar,
        nilai: hasil.data.nilai,
      },
    });
  } catch (error) {
    if (ambilKodePrisma(error) === "P2002") {
      return {
        pesan: "Nama penyewa ini sudah pernah memberi ulasan pada kos ini.",
      };
    }
    throw error;
  }

  revalidatePath(`/kos/${kosId}`);
  return { pesan: "Ulasan berhasil disimpan." };
}