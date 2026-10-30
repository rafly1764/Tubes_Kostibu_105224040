# Dokumen Teknis Modul 5 - Formulir, Validasi, Session, dan Cookie

**Nama:** Muhammad Rafly  
**NIM:** 105224040  
**Repositori:** https://github.com/rafly1764/Tubes_Kostibu_105224040
---

## 1. Skema Validasi

**Tabel Kolom Formulir Kosibu:**
| Nama Kolom | Aturan Zod 4 | Pesan Galat |
| :--- | :--- | :--- |
| `nama` | `.string().min(5).max(100)` | "Nama kos minimal 5 karakter", "Nama kos maksimal 100 karakter" |
| `tipe` | `.enum(["putra", "putri", "campur"])` | "Pilih salah satu tipe kos" |
| `deskripsi` | `.string().min(20).max(300)` | "Deskripsi minimal 20 karakter", "Deskripsi maksimal 300 karakter" |
| `tersedia` | `.stringbool().default(false)` | (Menggunakan default, tidak ada pesan galat) |

**Aturan Semantik di Server Action:**
Aturan semantik pada Kosibu adalah: **"Nama kos tidak boleh duplikat/sudah ada di database."** 
*Alasan:* Zod hanya melakukan validasi bentuk (sintaksis) dari data mentah yang dikirimkan. Untuk memastikan keunikan nama, kita harus membandingkannya dengan data yang sudah tersimpan di memori/pangkalan data, sehingga pengecekan ini wajib diletakkan di dalam Server Action setelah lolos Zod (di fungsi `simpanKos`).

---

## 2. Alur Server Action

Server Action (`app/kos/actions.ts`) di Kosibu dieksekusi dengan urutan ketat berikut:
1. **Pemeriksaan Sesi:** Fungsi memanggil `bacaSesi()`. Jika `null`, aksi berhenti dan mengembalikan pesan "Silakan masuk terlebih dahulu."
2. **Validasi Bentuk (Zod):** `formData` diurai dan diperiksa dengan `skemaKos.safeParse()`. Galat dikembalikan per kolom menggunakan `z.flattenError(hasil.error).fieldErrors`.
3. **Validasi Semantik:** Mengecek apakah `hasil.data.nama` sudah dipakai oleh entitas kos lain menggunakan fungsi `cekNamaKosSama()`.
4. **Mutasi:** Memanggil `tambahKos()` di dalam blok `try` untuk menyimpan entitas ke pangkalan data sementara.
5. **Revalidate & Redirect:** `revalidatePath("/kos")` dipanggil di dalam `try` atau setelahnya. **PENTING:** `redirect("/kos/[id]")` diletakkan **di luar** blok `try-catch` agar exception khusus bawaan Next.js untuk *redirect* tidak tidak sengaja tertangkap oleh *catch*.

**Pembagian Berkas:**
*   **Server Component:** `app/kos/tambah/page.tsx` (Membaca cookie sesi awal dan merender UI).
*   **Client Component:** `components/FormKos.tsx` (Memuat `<form>`, memanggil `useActionState`, merender pesan galat dengan atribut `aria-invalid` dan `aria-describedby`).
*   **Berkas "use server":** `app/kos/actions.ts` (Endpoint POST Server Action).

---

## 3. Bukti Uji Validasi

**Tabel 8 Kasus Uji Validasi:**

| No | Jenis Uji | Masukan | Hasil Diharapkan | Hasil Nyata |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Normal | Nama: Kos A, Tipe: putra, Desk: minimal dua puluh huruf | Sukses disimpan, pindah ke halaman detail | Sesuai |
| 2 | Klien - Kosong | Semua dikosongkan lalu Submit | Dihadang browser (HTML `required`) | Sesuai |
| 3 | Semantik | Nama: [Isi dgn Nama Kos di No 1] | Muncul galat "Nama kos sudah dipakai" dari server | Sesuai |
| 4 | Semantik (Sesi) | Sesi dihapus via DevTools, klik simpan | Muncul pesan umum "Silakan masuk terlebih dahulu" | Sesuai |
| 5 | **Bypass Klien (novalidate)** | Nama: Kos | Muncul galat server: "Nama kos minimal 5 karakter" | Sesuai |
| 6 | **Bypass Klien (novalidate)** | Kategori tidak dipilih | Muncul galat server: "Pilih salah satu tipe kos" | Sesuai |
| 7 | **Bypass Klien (novalidate)** | Deskripsi: pendek | Muncul galat server: "Deskripsi minimal 20 karakter" | Sesuai |
| 8 | Serangan Kolom Ekstra | Tambah `<input name="admin" value="true">` | Ditolak diam-diam oleh Zod (kolom ekstra dibuang) | Sesuai |

**Tangkapan Layar Galat Per Kolom:**
*(Pesan galat muncul tepat di bawah input, dan elemen terhubung menggunakan aria-describedby)*
![Bukti Pesan Galat dari Zod](Pesan%20Galat.png)

---

## 4. Session dan Cookie

**Atribut Cookie Sesi & Alasannya:**
*   `HttpOnly: true` -> Mencegah cookie dibaca oleh skrip JS klien (`document.cookie`), memitigasi pencurian via XSS.
*   `Secure: true` (di produksi) -> Memastikan cookie hanya melintasi jaringan HTTPS (mencegah *Man-in-the-Middle*).
*   `SameSite: "lax"` -> Mencegah pengiriman cookie pada request lintas situs selain navigasi level atas, meredam serangan CSRF.
*   `Max-Age: 28800` -> Membatasi masa hidup cookie hingga 8 jam agar tidak disalahgunakan selamanya jika tercuri.

**Bukti Tangkapan Layar Panel Application:**
![Bukti Cookie Sesi di Panel Application](Panel%20Application.png)

**Hasil Uji Keamanan Sesi:**
1.  **Cookie Palsu:** Mengubah nilai cookie menjadi sembarangan via DevTools. Hasil: Fungsi `bacaSesi()` gagal memverifikasi, Server Action memblokir pengiriman formulir.
2.  **Logout:** Mengeklik tombol keluar. Hasil: Fungsi `hapusSesi()` membuang ID dari memori server dan menghapus cookie, pengguna terlempar ke halaman utama.
3.  **Cookie Lama Setelah Logout:** Memasukkan kembali ID sesi lama via DevTools setelah logout. Hasil: Server menolak karena ID tersebut sudah dihapus dari *Map* memori server.

---

## 5. Keputusan Teknis

*   **Session Server vs Token Cookie:** Proyek ini menggunakan arsitektur Session di Server (hanya menyimpan ID UUID di cookie, data asli di memori server). Alasan utamanya adalah keunggulan **pencabutan akses (*revocability*)**. Saat admin *logout* atau diretas, server bisa langsung menghapus ID tersebut dari memori sehingga *cookie* lama seketika tidak berguna (terbukti pada pengujian sesi nomor 3). Jika menggunakan token mandiri (seperti JWT di cookie tanpa *state* server), token sulit dicabut sebelum masa *Max-Age*-nya habis.
*   **Batas Peran `proxy.ts`:** `proxy.ts` yang difungsikan sebagai *middleware* hanya digunakan untuk **pemeriksaan optimistik** (mengecek *keberadaan* string cookie secara dangkal agar pengguna tanpa cookie langsung dialihkan tanpa membebani *render*). `proxy.ts` TIDAK bisa memverifikasi apakah isi cookie tersebut sah/masih berlaku di pangkalan data. Oleh karena itu, verifikasi mendalam tetap wajib diletakkan di dalam Server Action.

---

## 6. Kendala dan Penyelesaian

Kendala:
1. Sempat mengalami *error* "404 Not Found" saat mengakses halaman form formulir.
2. Mengalami peringatan ESLint karena penggunaan tipe `any` dan parameter yang tidak terpakai pada fungsi aksi server.

Penyelesaian:
1. Membuat struktur fail yang benar yaitu `app/kos/tambah/page.tsx` agar rute dikenali secara statis oleh Next.js dan tidak masuk ke rute dinamis `[id]`.
2. Mengganti tipe `any` menjadi `unknown` dan menghapus parameter yang tidak digunakan (`sebelumnya` dan `formData`) di dalam Server Action agar lolos aturan linting (pemeriksaan kode) Next.js yang ketat.

---

## 7. Catatan Pemanfaatan AI

*   **Alat:** Google Gemini.
*   **Bagian yang digunakan:** Membantu menyusun kerangka draf awal laporan `modul-05.md` untuk menyelaraskan narasi penjelasan teknis (Atribut Cookie, Alur Server Action, Perbandingan Session vs Token) agar sesuai dengan struktur rubrik penilaian yang kaku. AI juga digunakan sebagai teman diskusi untuk merancang daftar 8 kasus uji (termasuk 3 skenario *bypass novalidate*).
*   **Cara Verifikasi:** Seluruh penjelasan teori dari AI dicocokkan ulang dengan dokumen PDF Praktikum Modul 5 (Bagian B Dasar Teori, tabel Atribut Cookie, dan tabel API Zod 4). Kode implementasi Server Action dan `proxy.ts` yang disarankan diverifikasi dengan cara dieksekusi secara nyata di lingkungan `localhost:3000` (menggunakan `npm run dev`) serta diuji dengan memalsukan token via Chrome DevTools untuk membuktikan kebenaran argumen *revocability* session.