export type TipeKos = "putra" | "putri" | "campur";

export interface Kamar {
  idKamar: string;
  tipeKamar: string;
  harga: number;
  tersedia: boolean;
}

export interface Kos {
  id: number;
  nama: string;
  tipe: TipeKos;
  lokasi: string;
  deskripsi: string;
  daftarKamar: Kamar[];
}

export const daftarKos: Kos[] = [
  { 
    id: 1, 
    nama: "Kosibu Demak Pusat", 
    tipe: "campur", 
    lokasi: "Demak", 
    deskripsi: "Fasilitas lengkap, dekat alun-alun Demak. Cocok untuk pekerja.", 
    daftarKamar: [
      { idKamar: "D1-01", tipeKamar: "Standar Kipas", harga: 400000, tersedia: true },
      { idKamar: "D1-02", tipeKamar: "Eksklusif AC", harga: 650000, tersedia: true },
    ]
  },
  { 
    id: 2, 
    nama: "Kosibu Semarang Tembalang", 
    tipe: "putra", 
    lokasi: "Semarang", 
    deskripsi: "Akses 5 menit ke kampus Undip. Tersedia area parkir motor luas.", 
    daftarKamar: [
      { idKamar: "S1-01", tipeKamar: "Reguler", harga: 750000, tersedia: true },
      { idKamar: "S1-02", tipeKamar: "Reguler Plus", harga: 850000, tersedia: false },
    ]
  },
  { 
    id: 3, 
    nama: "Kosibu Kudus Kota", 
    tipe: "putri", 
    lokasi: "Kudus", 
    deskripsi: "Aman dan nyaman, penjagaan 24 jam dengan gerbang sidik jari.", 
    daftarKamar: [
      { idKamar: "K1-01", tipeKamar: "Kamar Mandi Luar", harga: 500000, tersedia: false },
      { idKamar: "K1-02", tipeKamar: "Kamar Mandi Dalam", harga: 600000, tersedia: true },
    ]
  },
  
  { 
    id: 4, 
    nama: "Kosibu Jogja Depok", 
    tipe: "campur", 
    lokasi: "Yogyakarta", 
    deskripsi: "Dekat kawasan kampus UGM dan UNY. Suasana tenang, cocok untuk mahasiswa.", 
    daftarKamar: [
      { idKamar: "Y1-01", tipeKamar: "Standar Non-AC", harga: 800000, tersedia: true },
      { idKamar: "Y1-02", tipeKamar: "Paviliun AC", harga: 1500000, tersedia: true },
    ]
  },
  { 
    id: 5, 
    nama: "Kosibu Jakarta Selatan", 
    tipe: "putri", 
    lokasi: "Jakarta", 
    deskripsi: "Kost eksklusif dekat area perkantoran Kuningan. Akses mudah ke MRT dan TransJakarta.", 
    daftarKamar: [
      { idKamar: "J1-01", tipeKamar: "Eksklusif Standar", harga: 2500000, tersedia: false },
      { idKamar: "J1-02", tipeKamar: "Eksklusif Premium", harga: 3200000, tersedia: true },
    ]
  },
  { 
    id: 6, 
    nama: "Kosibu Banda Aceh", 
    tipe: "putra", 
    lokasi: "Aceh", 
    deskripsi: "Dekat dengan Masjid Raya Baiturrahman dan kampus USK. Lingkungan syariah yang nyaman.", 
    daftarKamar: [
      { idKamar: "A1-01", tipeKamar: "Reguler Kipas", harga: 550000, tersedia: true },
      { idKamar: "A1-02", tipeKamar: "Reguler AC", harga: 800000, tersedia: true },
    ]
  }
];

export function getRentangHarga(kamarList: Kamar[]): string {
  if (kamarList.length === 0) return "Harga belum tersedia";
  
  const hargaKamar = kamarList.map(k => k.harga);
  const hargaMin = Math.min(...hargaKamar);
  const hargaMax = Math.max(...hargaKamar);

  if (hargaMin === hargaMax) return `Rp ${hargaMin.toLocaleString('id-ID')} / bulan`;
  
  return `Rp ${hargaMin.toLocaleString('id-ID')} - Rp ${hargaMax.toLocaleString('id-ID')} / bulan`;
}
export function cariKos(id: number) {
  return daftarKos.find((kos) => kos.id === id);
}

import type { MasukanKos } from "./skema";

export function cekNamaKosSama(nama: string) {
  const dicari = nama.toLowerCase();
  return daftarKos.some((k) => k.nama.toLowerCase() === dicari);
}

export function tambahKos(masukan: MasukanKos) {

  const id = Math.max(0, ...daftarKos.map((k) => k.id)) + 1;
  
  const kosBaru = { 
    id, 
    ...masukan,
    lokasi: "Belum ditentukan", 
    daftarKamar: []      
  };
  
  daftarKos.push(kosBaru);
  return kosBaru;
}