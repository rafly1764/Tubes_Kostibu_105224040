import Link from "next/link";
import type { Kos } from "../lib/data";
import { getRentangHarga } from "../lib/data";

export default function KartuKos({ kos }: { kos: Kos }) {
  return (
    // UBAH baris ini dari <div ...> menjadi <article ...>
    <article className="flex flex-col h-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">Kos {kos.tipe}</span>
        <span className="text-sm text-gray-500">📍 {kos.lokasi}</span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        <Link href={`/kos/${kos.id}`} className="hover:text-emerald-600 hover:underline">
          {kos.nama}
        </Link>
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 grow">{kos.deskripsi}</p>
      
      <div className="pt-4 border-t border-gray-100">
        <p className="font-bold text-gray-900">{getRentangHarga(kos.daftarKamar)}</p>
      </div>

    {/* UBAH baris ini dari </div> menjadi </article> */}
    </article>
  );
}