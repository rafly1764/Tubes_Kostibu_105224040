# Inventaris Aset Web Kosibu

## 1. Aset Data
| ID | Nama Aset Data | Deskripsi | Klasifikasi | Keterangan Kriptografi |
|---|---|---|---|---|
| D1 | Data Katalog Kamar | Informasi detail kamar, fasilitas, dan harga sewa. | Publik | Tidak ada |
| D2 | Status Ketersediaan | Status real-time apakah kamar penuh atau tersedia. | Publik | Tidak ada |
| D3 | Kredensial Admin | Username dan password untuk masuk ke Dasbor. | Rahasia | **Dilindungi Kriptografi** (Hashing Password) |
| D4 | Data Sesi Otentikasi | Cookie/Token yang menandakan admin sedang login. | Rahasia | **Dilindungi Kriptografi** (Enkripsi/Tanda Tangan Digital) |

## 2. Aset Komponen (Sistem & Perangkat Lunak)
| ID | Nama Komponen | Deskripsi | Kategori |
|---|---|---|---|
| C1 | Web Browser (Client) | Peramban milik pengunjung atau admin untuk mengakses web. | Eksternal |
| C2 | Web Server (Next.js) | Server utama yang menangani routing dan logika antarmuka. | Server Aplikasi |
| C3 | Formulir Login | Komponen antarmuka (`FormLogin.tsx`) untuk autentikasi. | Modul Internal |
| C4 | Dasbor Admin | Halaman terproteksi untuk melihat/mengelola status kamar. | Modul Internal |
| C5 | Data Store / File | Tempat penyimpanan data kamar (`lib/data.ts`) dan kredensial. | Penyimpanan |