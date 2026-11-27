import crypto from 'crypto';

// 1. Persiapan Kunci menggunakan CSPRNG
// Di lingkungan produksi, nilai ini diambil dari process.env.MASTER_KEY
const MASTER_KEY = crypto.randomBytes(32);
const KUNCI_PALSU = crypto.randomBytes(32);

// 2. Fungsi Derivasi Kunci (HKDF) untuk Pemisahan Tujuan (Syarat Nilai K3)
function dapatkanKunciTurunan(kunciMaster: Buffer, tujuan: string): Buffer {
    // HKDF menggunakan SHA-256 untuk mengekstrak kunci 32-byte spesifik
    const hasilHKDF = crypto.hkdfSync('sha256', kunciMaster, Buffer.alloc(0), tujuan, 32);
    // Konversi ArrayBuffer ke Buffer agar TypeScript tidak protes
    return Buffer.from(hasilHKDF);
}

const KUNCI_ENKRIPSI = dapatkanKunciTurunan(MASTER_KEY, 'enkripsi-data-penyewa');
const KUNCI_ENKRIPSI_PALSU = dapatkanKunciTurunan(KUNCI_PALSU, 'enkripsi-data-penyewa');

// 3. Fungsi Enkripsi AEAD (AES-256-GCM) dengan Validasi dan Fail-Closed
function enkripsi(teks: string, kunci: Buffer, aad: string = "konteks-kosibu") {
    // Validasi Masukan (Fail-Closed)
    if (!teks || typeof teks !== 'string' || teks.trim() === '') {
        throw new Error("Masukan tidak valid: Teks harus berupa string dan tidak boleh kosong.");
    }

    const iv = crypto.randomBytes(12); // Nonce/IV unik dengan CSPRNG
    const cipher = crypto.createCipheriv('aes-256-gcm', kunci, iv);
    
    // Menambahkan AAD
    cipher.setAAD(Buffer.from(aad, 'utf8'));

    let terenkripsi = cipher.update(teks, 'utf8', 'hex');
    terenkripsi += cipher.final('hex');
    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString('hex'),
        terenkripsi: terenkripsi,
        authTag: authTag.toString('hex'),
        aad: aad
    };
}

// 4. Fungsi Dekripsi AEAD
function dekripsi(data: { iv: string; terenkripsi: string; authTag: string; aad: string }, kunci: Buffer) {
    const iv = Buffer.from(data.iv, 'hex');
    const authTag = Buffer.from(data.authTag, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', kunci, iv);
    decipher.setAAD(Buffer.from(data.aad, 'utf8'));
    decipher.setAuthTag(authTag);

    let terdekripsi = decipher.update(data.terenkripsi, 'hex', 'utf8');
    terdekripsi += decipher.final('utf8');
    return terdekripsi;
}

// ==========================================
// EKSEKUSI 4 SKENARIO PENGUJIAN (Syarat Nilai K4)
// ==========================================
console.log("\n=== PENGUJIAN KRIPTOGRAFI AEAD (AES-256-GCM + HKDF) ===");
const dataSensitif = "NIK: 3321123456780001 - Nama: Budi";
console.log("Data Asli:", dataSensitif);

// Skenario 1: Normal (Sukses)
console.log("\n[Skenario 1] Dekripsi dengan Kunci HKDF yang Benar");
const dataAman = enkripsi(dataSensitif, KUNCI_ENKRIPSI);
console.log("-> Hasil Enkripsi (Ciphertext):", dataAman.terenkripsi);
try {
    const hasil = dekripsi(dataAman, KUNCI_ENKRIPSI);
    console.log("✅ SUKSES: Data berhasil didekripsi ->", hasil);
} catch (e) {
    const error = e as Error;
    console.log("❌ GAGAL:", error.message);
}

// Skenario 2: Kunci Salah (Eavesdropping)
console.log("\n[Skenario 2] Dekripsi dengan Kunci Salah (Simulasi Peretas)");
try {
    dekripsi(dataAman, KUNCI_ENKRIPSI_PALSU);
    console.log("❌ BAHAYA: Data berhasil dibobol!");
} catch (e) {
    const error = e as Error;
    console.log("✅ DITOLAK (Aman): Penolakan dengan galat ->", error.message);
}

// Skenario 3: Manipulasi Teks (Tampering)
console.log("\n[Skenario 3] Peretas Mengubah Isi Ciphertext");
const dataDimodifikasi = { ...dataAman, terenkripsi: dataAman.terenkripsi.substring(0, dataAman.terenkripsi.length - 1) + '0' };
try {
    dekripsi(dataDimodifikasi, KUNCI_ENKRIPSI);
    console.log("❌ BAHAYA: Data termanipulasi berhasil lolos!");
} catch (e) {
    const error = e as Error;
    console.log("✅ DITOLAK (Aman): Modifikasi terdeteksi! Galat ->", error.message);
}

// Skenario 4: Modifikasi AAD (Additional Authenticated Data)
console.log("\n[Skenario 4] Peretas Memanipulasi Parameter AAD");
const aadDimodifikasi = { ...dataAman, aad: "konteks-berbeda" };
try {
    dekripsi(aadDimodifikasi, KUNCI_ENKRIPSI);
    console.log("❌ BAHAYA: AAD palsu berhasil lolos!");
} catch (e) {
    const error = e as Error;
    console.log("✅ DITOLAK (Aman): AAD tidak sesuai! Galat ->", error.message);
}
console.log("==================================================\n");