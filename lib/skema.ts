import { z } from "zod";

export const skemaKos = z.object({
  nama: z.string().trim()
    .min(5, "Nama kos minimal 5 karakter")
    .max(100, "Nama kos maksimal 100 karakter"),
  tipe: z.enum(["putra", "putri", "campur"], {
    error: "Pilih salah satu tipe kos",
  }),
  deskripsi: z.string().trim()
    .min(20, "Deskripsi minimal 20 karakter")
    .max(300, "Deskripsi maksimal 300 karakter"),
});

export type MasukanKos = z.infer<typeof skemaKos>;