"use client"; // Wajib ditambahkan karena kita menggunakan interaksi ketikan (useState)

import { useState } from "react";
import KartuKos from "./KartuKos";
import type { Kos } from "../lib/data";

export default function DaftarKos({ daftar }: { daftar: Kos[] }) {
  // State untuk menyimpan teks yang diketik pengguna
  const [kataKunci, setKataKunci] = useState("");

  // Logika menyaring data kos berdasarkan lokasi atau nama
  const hasilPencarian = daftar.filter((kos) => {
    const teksPencarian = kataKunci.toLowerCase();
    return (
      kos.lokasi.toLowerCase().includes(teksPencarian) ||
      kos.nama.toLowerCase().includes(teksPencarian)
    );
  });

  return (
    <div>
      {/* Kolom Pencarian Asli yang Terhubung ke Data */}
      <div className="mb-6">
        <label htmlFor="cari-kos" className="sr-only">Cari lokasi atau nama kos</label>
        <input
          id="cari-kos"
          type="text"
          placeholder="🔍 Cari kota (misal: Jakarta, Demak)..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          className="w-full sm:w-96 rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Menampilkan Peringatan Jika Kos Tidak Ditemukan */}
      {hasilPencarian.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">Waduh, kos di area <span className="font-bold">&quot;{kataKunci}&quot;</span> belum tersedia.</p>
        </div>
      ) : (
        // Menampilkan Daftar Kartu Kos yang Sudah Disaring
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasilPencarian.map((kos) => (
            <li key={kos.id}>
              <KartuKos kos={kos} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}