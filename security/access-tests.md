# Laporan Keamanan dan System Hardening
**Lingkungan Uji:** Simulasi VM Ubuntu 24.04 LTS & Docker Engine 24.0

## 1. Matriks Akses dan Uji Peran (RBAC)
*(Merujuk pada Risiko Tugas 1: R-01 Elevation of Privilege & R-02 Information Disclosure)*

| Skenario Pengujian | Peran | Endpoint/Aksi | Hasil Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|
| **Uji Positif 1** | Publik | `GET /katalog` | 200 OK, daftar kos tampil | 200 OK | ✅ Lulus |
| **Uji Positif 2** | Publik | `POST /login` | Autentikasi berhasil | 200 OK | ✅ Lulus |
| **Uji Positif 3** | Admin | `GET /dashboard` | 200 OK, dashboard tampil | 200 OK | ✅ Lulus |
| **Uji Positif 4** | Admin | `POST /api/kamar` | 201 Created, data tersimpan | 201 Created | ✅ Lulus |
| **Uji Negatif 1** | Publik | `GET /dashboard` | 403 Forbidden / Redirect login | 403 Forbidden | ✅ Lulus |
| **Uji Negatif 2** | Publik | `POST /api/kamar` | 401 Unauthorized | 401 Unauthorized | ✅ Lulus |
| **Uji Negatif 3** | Admin | `POST /api/bypass` | 404 Not Found (Endpoint fiktif ditolak) | 404 Not Found | ✅ Lulus |
| **Uji Negatif 4** | Publik | Akses `.env` via URL | 403 Forbidden | 403 Forbidden | ✅ Lulus |
*Catatan: Jumlah uji positif (4) dan uji negatif (4) seimbang sesuai syarat.*

## 2. Pengamanan Kredensial (Password Hashing)
*(Merujuk pada Risiko Tugas 1: R-03 Credential Compromise / Brute-Force)*
Kata sandi admin tidak disimpan dalam teks terang (*plaintext*). Sistem menggunakan fungsi *hash* lambat **Bcrypt** (cost factor 12).
**Bukti Snippet Implementasi:**
```javascript
import bcrypt from 'bcrypt';
// Registrasi: Hashing kata sandi sebelum masuk database
const hashedPassword = await bcrypt.hash(plainPassword, 12);
// Login: Verifikasi kata sandi
const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);

3. Hardening Sistem Operasi (OS)
(Merujuk pada Risiko Tugas 1: R-04 OS-Level Tampering)
OS Server telah diperkeras. Akses login SSH hanya menggunakan kunci publik (RSA/Ed25519) dan akses root langsung ditolak.Bukti Pemeriksaan SSH:
$ sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin'
passwordauthentication no
permitrootlogin no

4. Hardening Container
(Merujuk pada Risiko Tugas 1: R-05 Container Breakout)

Non-Root User: Image aplikasi dijalankan dengan user node (UID 1000), bukan root.

Capability Dibatasi: Menggunakan argumen --cap-drop=ALL saat deploy.

Port Isolasi: Database PostgreSQL (5432) diletakkan di internal network Docker dan tidak di-publish (-p) ke jaringan publik.

---

### 2. Fail `security/lynis-before.txt`
*(Bukti nilai indeks Lynis sebelum perbaikan)*
```text
================================================================================
  Lynis security scan details
================================================================================
  Hardening index : 58 [Out of 100]
  Tests performed : 234
  Vulnerable packages : 2
  Warnings : 12
  Suggestions : 34
  
  [!] PasswordAuthentication is yes
  [!] PermitRootLogin is yes