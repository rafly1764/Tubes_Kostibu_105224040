Kosibu - Sistem Informasi Kos Putri Demak

Kosibu adalah sebuah aplikasi web yang dirancang untuk mempermudah pengelolaan dan pencarian kamar kos khusus putri yang berlokasi di Demak, Jawa Tengah. Proyek ini dikembangkan sebagai bagian dari Tugas Terintegrasi (Milestone 1) untuk mata kuliah Pengembangan Aplikasi Web, Keamanan Komputasi dan Siber, serta Kriptografi.

Konsep Produk

Permasalahan yang Diselesaikan

Calon Penyewa: Kesulitan mendapatkan informasi akurat terkait ketersediaan kamar, spesifikasi, dan harga secara real-time tanpa harus datang langsung ke lokasi.

Pengelola Kos: Membutuhkan sistem pencatatan digital yang rapi untuk mengubah status ketersediaan kamar dan harga agar tidak bergantung pada catatan manual.

Sasaran Pengguna

Pencari Kos (Publik): Mahasiswi atau pekerja perempuan yang mencari hunian nyaman dan strategis.

Pengelola/Admin: Pemilik kos yang perlu mengelola ketersediaan dan data kamar.

Tujuan Aplikasi

Menyediakan platform satu pintu yang interaktif, responsif, dan mudah diakses bagi calon penyewa untuk melihat katalog kamar, sekaligus menyediakan ruang dasbor admin bagi pengelola untuk memantau status propertinya.

Fitur Awal (Milestone 1)

Pada tahap v0.1 ini, fitur antarmuka yang telah diimplementasikan meliputi:

Katalog Kamar Dinamis: Menampilkan 5 pilihan kamar dengan spesifikasi (ukuran, fasilitas, harga) dan status ketersediaan (Tersedia/Penuh) yang ditarik dari mock data.

Desain Responsif & Aksesibel: Antarmuka dapat menyesuaikan ukuran layar dengan baik (ponsel, tablet, desktop) menggunakan sistem grid dari Tailwind CSS dan elemen HTML semantik.

Halaman Login Admin: Dilengkapi dengan formulir masuk yang menggunakan validasi sisi klien (client-side validation) untuk mencegah input kosong atau kata sandi yang terlalu pendek.

Dasbor Admin: Antarmuka tabel sederhana untuk melihat rangkuman status seluruh kamar.

Teknologi yang Digunakan

Framework: Next.js (App Router)

Library UI: React

Bahasa Pemrograman: TypeScript

Styling: Tailwind CSS

Struktur Aplikasi

Aplikasi ini dikembangkan dengan pendekatan komponen (Component-Based Architecture).

/app : Berisi struktur routing utama web (page.tsx untuk beranda, /login, dan /dashboard).

/components : Berisi komponen UI yang dapat digunakan ulang (reusable) seperti Header, Footer, KartuKamar, InputText, dan FormLogin.

/lib : Tempat penyimpanan mock data sementara (data.ts) sebelum diintegrasikan dengan database pada milestone selanjutnya.

Petunjuk Menjalankan Proyek Secara Lokal

Untuk menjalankan aplikasi ini di komputer Anda, ikuti langkah-langkah berikut:

Kloning Repositori

git clone https://github.com/rafly1764/Tubes_Kostibu_105224040.git
cd kosibu


Instalasi Dependensi
Pastikan Anda telah menginstal Node.js, lalu jalankan:

npm install


Jalankan Server Pengembang (Development Server)

npm run dev