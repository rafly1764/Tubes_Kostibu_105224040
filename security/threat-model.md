# Pemodelan Ancaman (Threat Model) STRIDE - Web Kosibu

Berikut adalah daftar 10 ancaman spesifik pada sistem Kosibu berdasarkan kerangka kerja STRIDE.

| ID | Kategori STRIDE | Elemen DFD | Deskripsi Ancaman | Aset Terdampak |
|---|---|---|---|---|
| TM01 | **S**poofing | P2, E2 | Penyerang melakukan *brute-force* atau menebak *username/password* pada antarmuka Login (P2) untuk memalsukan identitas sebagai Admin Kosibu (E2). | D3 (Kredensial Admin) |
| TM02 | **S**poofing | P3, C1 | Penyerang memalsukan *cookie* atau token sesi admin pada *browser* (C1) agar bisa masuk ke halaman Dasbor (P3) tanpa melalui proses login. | D4 (Data Sesi Otentikasi) |
| TM03 | **T**ampering | P1, TB1 | Serangan *Man-in-the-Middle* (MitM) mencegat dan memodifikasi data katalog dan harga kamar saat dikirim dari server (P1) melintasi internet publik (TB1) ke calon penyewa. | D1 (Katalog Kamar) |
| TM04 | **T**ampering | C3, P2 | Pengguna jahat memodifikasi struktur formulir login (C3) pada sisi *client-side* untuk menyisipkan *payload* berbahaya sebelum diproses oleh server (P2). | C3 (Formulir Login) |
| TM05 | **R**epudiation | P3, DS1 | Admin mengubah status ketersediaan kamar di Dasbor (P3), namun karena tidak ada log aktivitas (DS1), perubahan tersebut tidak bisa dilacak waktu dan pelakunya. | D2 (Status Ketersediaan) |
| TM06 | **R**epudiation | P2, DS2 | Sistem gagal mencatat (*logging*) IP dan waktu ketika terjadi kegagalan login berulang kali di (P2), sehingga serangan tidak memiliki bukti forensik. | D3 (Kredensial Admin) |
| TM07 | **I**nformation Disclosure | P2, C3 | Pesan validasi *error* pada saat login (P2) terlalu spesifik (misal: "Username salah" vs "Password salah"), sehingga memudahkan penyerang menebak kredensial. | D3 (Kredensial Admin) |
| TM08 | **I**nformation Disclosure | C2, DS2 | Kesalahan konfigurasi pada *routing* Next.js (C2) menyebabkan berkas sistem atau daftar kredensial *hash* (DS2) dapat diakses secara publik. | C5 (Data Store) |
| TM09 | **D**enial of Service | P1, C2 | Penyerang membanjiri halaman *endpoint* Beranda (P1) dengan banyak *request* fiktif, membuat server Next.js (C2) kehabisan sumber daya dan situs Kosibu mati (down). | C2 (Web Server) |
| TM10 | **E**levation of Privilege | P3, E1 | Pengunjung biasa (E1) mencoba mengakses URL `/dashboard` secara langsung dan berhasil membukanya (P3) karena tidak ada validasi keamanan pada tingkat halaman tersebut. | C4 (Dasbor Admin) |