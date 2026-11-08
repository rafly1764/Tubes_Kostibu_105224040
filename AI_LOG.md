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