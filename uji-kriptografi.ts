import crypto from 'crypto';

// 1. Persiapan Kunci (Harus 32 bytes / 256 bits untuk AES-256)
const KUNCI_ASLI = crypto.randomBytes(32).toString('hex');
const KUNCI_PALSU = crypto.randomBytes(32).toString('hex'); // Simulasi peretas menebak kunci

// 2. Fungsi Enkripsi AEAD (AES-256-GCM)
function enkripsi(teks: string, kunciHex: string) {
  const kunci = Buffer.from(kunciHex, 'hex');
  const iv = crypto.randomBytes(12); // Standar IV untuk GCM adalah 12 bytes
  
  const cipher = crypto.createCipheriv('aes-256-gcm', kunci, iv);
  let terenkripsi = cipher.update(teks, 'utf8', 'hex');
  terenkripsi += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  
  return {
    iv: iv.toString('hex'),
    terenkripsi: terenkripsi,
    authTag: authTag.toString('hex')
  };
}

// 3. Fungsi Dekripsi AEAD
function dekripsi(data: { iv: string; terenkripsi: string; authTag: string }, kunciHex: string) {
  const kunci = Buffer.from(kunciHex, 'hex');
  const iv = Buffer.from(data.iv, 'hex');
  const authTag = Buffer.from(data.authTag, 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-gcm', kunci, iv);
  decipher.setAuthTag(authTag);
  
  let terdekripsi = decipher.update(data.terenkripsi, 'hex', 'utf8');
  terdekripsi += decipher.final('utf8');
  return terdekripsi;
}

// ==========================================
// EKSEKUSI 4 SKENARIO PENGUJIAN
// ==========================================
console.log("\n=== PENGUJIAN KRIPTOGRAFI AEAD (AES-256-GCM) ===");
const dataSensitif = "NIK: 3321123456780001 - Nama: Budi";
console.log("Data Asli:", dataSensitif);

// Skenario 1: Normal (Sukses)
console.log("\n[Skenario 1] Dekripsi dengan Kunci yang Benar");
const dataAman = enkripsi(dataSensitif, KUNCI_ASLI);
console.log("-> Hasil Enkripsi (Ciphertext):", dataAman.terenkripsi);
try {
  const hasil = dekripsi(dataAman, KUNCI_ASLI);
  console.log("✅ SUKSES: Data berhasil didekripsi ->", hasil);
} catch (e) {
  const error = e as Error;
  console.log("❌ GAGAL:", error.message);
}

// Skenario 2: Kunci Salah (Eavesdropping)
console.log("\n[Skenario 2] Dekripsi dengan Kunci Salah (Simulasi Peretas)");
try {
  dekripsi(dataAman, KUNCI_PALSU);
  console.log("❌ BAHAYA: Data berhasil dibobol!");
} catch (e) {
  const error = e as Error;
  console.log("✅ DITOLAK (Aman): Kunci salah! Error ->", error.message);
}

// Skenario 3: Manipulasi Teks (Tampering)
console.log("\n[Skenario 3] Peretas Mengubah Isi Ciphertext");
// Mengubah satu karakter saja pada teks yang dienkripsi
const dataDimodifikasi = { ...dataAman, terenkripsi: dataAman.terenkripsi.substring(0, dataAman.terenkripsi.length - 1) + '0' };
try {
  dekripsi(dataDimodifikasi, KUNCI_ASLI);
  console.log("❌ BAHAYA: Data termanipulasi berhasil lolos!");
} catch (e) {
  const error = e as Error;
  console.log("✅ DITOLAK (Aman): Manipulasi terdeteksi! Error ->", error.message);
}

// Skenario 4: Manipulasi Auth Tag
console.log("\n[Skenario 4] Peretas Mengubah Auth Tag");
// Mengubah satu karakter pada Auth Tag
const tagDimodifikasi = { ...dataAman, authTag: dataAman.authTag.substring(0, dataAman.authTag.length - 1) + '0' };
try {
  dekripsi(tagDimodifikasi, KUNCI_ASLI);
  console.log("❌ BAHAYA: Tag termanipulasi berhasil lolos!");
} catch (e) {
  const error = e as Error;
  console.log("✅ DITOLAK (Aman): Auth Tag tidak valid! Error ->", error.message);
}
console.log("==================================================\n");