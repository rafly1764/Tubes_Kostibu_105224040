import { z } from "zod";

export const opsiTipeKos = ["Putra", "Putri", "Campuran"] as const;

export const skemaKos = z.object({
  nama: z.string().trim().min(3, "Nama kos minimal 3 karakter."),
  tipe: z.enum(opsiTipeKos),
  deskripsi: z.string().trim().max(500, "Deskripsi maksimal 500 karakter."),
  // "true" -> true, "false" -> false; nilai lain menjadi galat validasi
  tersedia: z.coerce.boolean(),
});

export const skemaUlasan = z.object({
  namaPenyewa: z.string().trim().min(2, "Nama penyewa minimal 2 karakter."),
  komentar: z
    .string()
    .trim()
    .min(3, "Ulasan minimal 3 karakter.")
    .max(280, "Ulasan maksimal 280 karakter."),
  nilai: z.coerce
    .number()
    .int("Nilai harus bilangan bulat.")
    .min(1, "Nilai minimal 1.")
    .max(5, "Nilai maksimal 5."),
});

export type MasukanKos = z.infer<typeof skemaKos>;
