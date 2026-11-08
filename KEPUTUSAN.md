# Keputusan Desain Kriptografi: Implementasi AEAD (Tugas 2)

## 1. Skenario Kebutuhan
Sistem manajemen Kosibu menyimpan data sensitif calon penyewa, seperti Nomor Induk Kependudukan (NIK) dan data kontak. Data ini tidak boleh bocor ke publik (butuh Kerahasiaan) dan tidak boleh diubah oleh peretas di *database* (butuh Integritas).

## 2. Pemilihan Mekanisme & Perbandingan (K1)
Mekanisme yang dipilih adalah enkripsi terautentikasi (AEAD) menggunakan **AES-256-GCM**.
Alasan dan perbandingannya dengan mekanisme lain yang ada di aplikasi ini:
*   **Enkripsi Terautentikasi (AEAD vs Enkripsi Biasa):** Enkripsi biasa (seperti AES-CBC) rentan terhadap modifikasi (*tampering*). AEAD (AES-GCM) mengatasi ini dengan menghasilkan *Ciphertext* sekaligus *Auth Tag*.
*   **AEAD vs Hash Biasa:** Hash murni (seperti SHA-256) berguna memverifikasi integritas satu arah, namun tidak untuk kerahasiaan karena data aslinya tidak bisa dikembalikan.
*   **AEAD vs Password Hashing:** Untuk kata sandi admin (yang belum dikerjakan di modul ini), kami akan menggunakan mekanisme khusus *Password Hashing* berbasis RAM yang lambat (Argon2/Bcrypt). AEAD tidak cocok untuk kata sandi karena prosesnya terlalu cepat (*brute-forceable*).

## 3. Dokumentasi Parameter & Kunci (K2 & K3)
*   **Panjang Kunci (Master Key):** 32 bytes (256 bits), dibangkitkan dengan CSPRNG (`crypto.randomBytes`) dan disimpan sebagai variabel environment di luar repositori (`.env`).
*   **Key Derivation (HKDF):** Untuk keamanan maksimal, *Master Key* tidak dipakai langsung. Kami menggunakan HKDF (*HMAC-based Extract-and-Expand Key Derivation Function*) untuk menurunkan kunci spesifik.
*   **IV (Initialization Vector) / Nonce:** 12 bytes yang unik (CSPRNG) untuk setiap operasi enkripsi.
*   **AAD (Additional Authenticated Data):** Parameter untuk melindungi konteks tambahan yang tidak dienkripsi tetapi diautentikasi.
*   **Tag:** *Auth Tag* 16 bytes untuk menjamin integritas teks.

## 4. Penanganan Masukan (Fail-Closed)
Setiap masukan teks ke fungsi kriptografi divalidasi terlebih dahulu (memastikan tipe datanya *string* dan tidak kosong). Jika terjadi galat dekripsi atau validasi, sistem mengadopsi prinsip gagal tertutup (*fail-closed*) dengan langsung melemparkan *error* tanpa membocorkan status sensitif ke pengguna akhir.

![Bukti Kriptografi](docs/bukti-kriptografi.png)