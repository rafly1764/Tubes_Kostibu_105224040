# Log Penggunaan AI (Keamanan Komputasi dan Siber - Tugas 1)

* **Alat yang digunakan:** Gemini
* **Tujuan penggunaan:** Membantu menyusun struktur awal dokumen Threat Model (STRIDE) dan merumuskan bahasa teknis untuk rencana kontrol risiko prioritas.
* **Ringkasan perintah (Prompt):** "Bantu saya membuat 10 threat STRIDE dan 5 risiko prioritas berdasarkan DFD aplikasi web Next.js Kosibu yang sudah dibuat sebelumnya."
* **Bagian yang dipakai/diubah:** Seluruh tabel STRIDE dan Risk Register diadaptasi dari draf AI, kemudian ditinjau ulang agar sesuai dengan komponen nyata di dalam proyek (seperti penyesuaian aset Next.js dan DFD Kosibu).
* **Cara memeriksa kebenaran:** Meninjau kembali referensi materi Pekan 3 (Threat Modeling) dan memastikan setiap ancaman yang dihasilkan AI benar-benar merujuk pada panah dan komponen di dalam diagram.

---

# Log Penggunaan AI (Kriptografi - Tugas 2)

- **Alat yang Digunakan:** Google Gemini AI.
- **Tujuan Penggunaan:** Membantu memahami implementasi fungsi `crypto` Node.js untuk mode AEAD (AES-256-GCM), membangkitkan kunci menggunakan HKDF, dan menyusun skenario penolakan gagal tertutup.
- **Ringkasan Perintah (Prompt):** "Bantu saya membuat skrip pengujian AES-256-GCM menggunakan modul crypto Node.js lengkap dengan derivasi kunci HKDF dan 4 skenario pembuktian penolakan."
- **Bagian yang Dipakai/Diubah:** Implementasi fungsi enkripsi/dekripsi AEAD beserta metode `.setAAD()` dan `hkdfSync` dari AI diadaptasi ke dalam fail `uji-kriptografi.ts` dan disesuaikan dengan konteks proyek Kosibu.
- **Cara Memeriksa Kebenaran:** Melakukan eksekusi skrip secara lokal di terminal dan memastikan bahwa skenario modifikasi data atau kunci yang salah secara konsisten ditolak (error) sesuai prinsip gagal tertutup (*fail-closed*).


---

# Log Penggunaan AI (Praktikum PAW - Modul 7: Debugging dan Telaah Kode)

- **Alat yang Digunakan:** Antigravity / Gemini.
- **Tujuan Penggunaan:** Menerapkan kode usulan AI sesuai skenario Modul 7 pada entitas `Kos` dan `Ulasan`, menyempurnakan `.vscode/launch.json`, menelusuri dan memperbaiki 4 galat pada akar penyebabnya, menambahkan error boundary `app/kos/[id]/error.tsx`, serta menyusun dokumen teknis `docs/praktikum/modul-07.md`.
- **Ringkasan Perintah (Prompt):** "Kerjakan tugas Modul 7 Debugging dan Telaah Kode pada proyek Kosibu, perbaiki konfigurasi debugger VS Code, reproduksi dan perbaiki galat pada kode usulan AI beserta bukti tangkapan layar dan laporan di `docs/praktikum/modul-07.md`."
- **Bagian Kode AI & Galat yang Ditemukan:**
  1. `lib/skema.ts` — `tersedia: z.coerce.boolean()` mengubah string `"false"` menjadi `true` karena memakai `Boolean()`.
  2. `app/kos/actions.ts` — `redirect("/kos")` di dalam blok `try/catch` menyebabkan `NEXT_REDIRECT` tertelan `catch`, sehingga hapus kos tanpa ulasan gagal redirect.
  3. `app/kos/actions.ts` — `prisma.kos.delete()` pada kos berulasan memicu `P2003` (`Ulasan_kosId_fkey`) yang ditelan `catch` (`console.log("Gagal menghapus")`), dan galat tak terduga (`P2025`) belum ditangani `error.tsx`.
  4. `components/FormUlasan.tsx` — `useEffect(() => { setSisa(280 - isi.length); }, [])` menyebabkan penghitung sisa karakter tetap `280` saat mengetik dan memicu galat ESLint `react-hooks/set-state-in-effect`.
- **Perubahan yang Dilakukan:**
  - Mengganti `z.coerce.boolean()` dengan `z.stringbool()` di `lib/skema.ts`.
  - Menggunakan `prisma.$transaction` untuk menghapus ulasan dan kos secara atomik, tidak menelan galat tak terduga, dan memindahkan `redirect("/kos")` ke luar `try/catch` di `app/kos/actions.ts`, serta membuat `app/kos/[id]/error.tsx`.
  - Menghapus `useEffect` dan state `sisa` di `components/FormUlasan.tsx`, menggantinya dengan nilai turunan `const sisa = 280 - isi.length;`.
  - Menambahkan `await connection()` dan `<Suspense>` pada halaman Server Component `/kos`, `/kos/[id]`, dan `/kos/[id]/edit` agar selaras dengan Next.js 16.4 (`cacheComponents: true`).
- **Cara Memeriksa Kebenaran:** Menjalankan server `npm run dev -- --inspect` terhadap PostgreSQL lokal, mereproduksi keempat galat sebelum dan sesudah perbaikan (termasuk uji 5/5 ubah status, uji hapus kos tanpa/dengan ulasan, uji hapus 2 tab yang memicu `P2025` dan merender `error.tsx` dengan `digest`, serta uji ketik `"halo"` pada `FormUlasan`), lalu memastikan `npm run lint` dan `npx tsc --noEmit` lulus bersih tanpa galat maupun peringatan.
