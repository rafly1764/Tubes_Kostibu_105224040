import { strict as assert } from 'assert';
import { generateSalt, hashPassword, verifyPassword } from '../lib/crypto';

function runTests() {
    console.log("Memulai pengujian otomatis komponen kriptografi Kosibu...\n");

    const salt1 = generateSalt();
    const passwordAsli = "rahasia123";
    const hash1 = hashPassword(passwordAsli, salt1);

    // 1. Uji Positif: Hash konsisten
    const hash2 = hashPassword(passwordAsli, salt1);
    assert.equal(hash1, hash2, "Skenario 1 Gagal: Hash tidak konsisten");
    console.log("✅ Skenario 1 (Positif): Fungsi hash konsisten dengan salt yang sama.");

    // 2. Uji Positif: Verifikasi sandi benar (Autentikasi Valid)
    const isValid = verifyPassword(passwordAsli, salt1, hash1);
    assert.equal(isValid, true, "Skenario 2 Gagal: Sandi benar ditolak");
    console.log("✅ Skenario 2 (Positif): Verifikasi sandi yang benar berhasil diloloskan.");

    // 3. Uji Negatif: Verifikasi sandi salah
    const isInvalid = verifyPassword("salah123", salt1, hash1);
    assert.equal(isInvalid, false, "Skenario 3 Gagal: Sandi salah malah lolos");
    console.log("✅ Skenario 3 (Negatif): Penolakan terhadap sandi yang salah berfungsi (Akses Ditolak).");

    // 4. Uji Batas (Boundary): Menangani input password kosong
    const hashEmpty = hashPassword("", salt1);
    const isEmptyValid = verifyPassword("", salt1, hashEmpty);
    assert.equal(isEmptyValid, true, "Skenario 4 Gagal: Gagal memproses string kosong");
    console.log("✅ Skenario 4 (Uji Batas): Mampu menangani dan memverifikasi input berupa string kosong (Empty String).");

    console.log("\n🎉 SEMUA PENGUJIAN BERHASIL (4/4 Skenario Lulus)");
}

runTests();