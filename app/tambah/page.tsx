"use client";

import { useActionState } from "react";
import { tambahKos } from "../actions"; // Pastikan path ini mengarah ke actions.ts
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HalamanTambahKos() {
  const [state, formAction, pending] = useActionState(tambahKos, {});

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="grow max-w-xl w-full mx-auto px-4 py-10">
        <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-6 text-emerald-700">Tambah Properti Kos Baru</h1>
          
          {/* Pesan eror umum (seperti P2002 nama kembar) */}
          {state?.pesan && (
            <div className="p-3 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-lg text-sm font-medium">
              {state.pesan}
            </div>
          )}

          <form action={formAction} className="space-y-6">
            
            {/* Input Nama Kos */}
            <div>
              <label htmlFor="nama" className="block font-semibold text-gray-700 mb-1">Nama Properti</label>
              <input 
                type="text" 
                id="nama" 
                name="nama" 
                className={`w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow ${state?.galat?.nama ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Contoh: Kos Mawar Indah" 
              />
              {/* Pesan eror Zod untuk Nama */}
              {state?.galat?.nama && (
                <p className="text-red-600 text-sm mt-1.5 font-medium">{state.galat.nama[0]}</p>
              )}
            </div>

            {/* Input Tipe Kos */}
            <div>
              <label htmlFor="tipe" className="block font-semibold text-gray-700 mb-1">Tipe Kos</label>
              <select 
                id="tipe" 
                name="tipe" 
                className={`w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow ${state?.galat?.tipe ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">-- Pilih Tipe --</option>
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
                <option value="Campuran">Campuran</option>
              </select>
              {/* Pesan eror Zod untuk Tipe */}
              {state?.galat?.tipe && (
                <p className="text-red-600 text-sm mt-1.5 font-medium">{state.galat.tipe[0]}</p>
              )}
            </div>

            {/* Input Deskripsi */}
<div>
  <label htmlFor="deskripsi" className="block font-semibold text-gray-700 mb-1">Deskripsi Kos</label>
  <textarea 
    id="deskripsi" 
    name="deskripsi" 
    rows={4} 
    className={`w-full border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow ${state?.galat?.deskripsi ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
    placeholder="Tuliskan fasilitas atau deskripsi singkat..."
  ></textarea>
  
  {state?.galat?.deskripsi && (
    <p className="text-red-600 text-sm mt-1.5 font-medium">{state.galat.deskripsi[0]}</p>
  )}
</div>

            {/* Tombol Aksi */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-2">
              <button 
                type="submit" 
                disabled={pending}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 font-bold disabled:opacity-50 transition-colors shadow-sm"
              >
                {pending ? "Menyimpan Data..." : "Simpan Kos"}
              </button>
              
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-800 font-medium">
                Batal
              </Link>
            </div>
            
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}