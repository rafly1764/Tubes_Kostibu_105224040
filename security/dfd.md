# Diagram Aliran Data (DFD) Web Kosibu

Berikut adalah pemodelan DFD Level 0 yang menggambarkan aliran data pada sistem Kosibu.

```mermaid
flowchart TD
    %% Trust Boundary 1: Internet / Lingkungan Publik
    subgraph TB1 [Trust Boundary 1: Jaringan Publik / Internet]
        E1[E1: Pengunjung / Calon Penyewa]
        E2[E2: Admin / Pengelola Kos]
    end

    %% Trust Boundary 2: Server Aplikasi Web
    subgraph TB2 [Trust Boundary 2: Server Aplikasi Next.js]
        P1(P1: Proses Render Katalog)
        P2(P2: Proses Autentikasi Login)
        P3(P3: Proses Dasbor Admin)
    end

    %% Trust Boundary 3: Lapisan Penyimpanan Data
    subgraph TB3 [Trust Boundary 3: File System / Database]
        DS1[(DS1: Penyimpanan Data Kamar <br> Aset: D1, D2)]
        DS2[(DS2: Kredensial & Sesi Admin <br> Aset: D3, D4 <br> 🔒 *Dilindungi Kriptografi*)]
    end

    %% Interaksi Pengunjung
    E1 -- Meminta Halaman Utama --> P1
    P1 -- Mengembalikan Tampilan Kamar --> E1
    P1 -- Membaca Status Kamar --> DS1

    %% Interaksi Admin - Login
    E2 -- Memasukkan Username & Password (D3) --> P2
    P2 -- Memverifikasi Hash Password (Kriptografi) --> DS2
    P2 -- Mengembalikan Status Login / Sesi (D4) --> E2

    %% Interaksi Admin - Dasbor
    E2 -- Meminta Dasbor dengan Sesi (D4) --> P3
    P3 -- Memvalidasi Sesi Admin --> DS2
    P3 -- Mengambil Data Status Kamar --> DS1
    P3 -- Menampilkan Antarmuka Dasbor --> E2