import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

/**
 * Menghasilkan salt acak menggunakan CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)
 */
export function generateSalt(): string {
  return randomBytes(16).toString('hex');
}

/**
 * Melakukan proses hashing pada password menggunakan algoritma Scrypt
 * Scrypt dipilih karena lebih kebal terhadap serangan brute-force hardware (ASIC/GPU) dibanding SHA-256.
 */
export function hashPassword(password: string, salt: string): string {
  const buffer = scryptSync(password, salt, 64);
  return buffer.toString('hex');
}

/**
 * Memverifikasi kecocokan password.
 * Menggunakan timingSafeEqual untuk mencegah serangan Timing Attack (syarat uji keamanan).
 */
export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const passwordBuffer = scryptSync(password, salt, 64);
  const hashBuffer = Buffer.from(hash, 'hex');
  
  if (passwordBuffer.length !== hashBuffer.length) {
    return false;
  }
  return timingSafeEqual(passwordBuffer, hashBuffer);
}