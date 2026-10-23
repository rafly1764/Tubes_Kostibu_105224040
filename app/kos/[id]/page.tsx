import Link from "next/link";
import { notFound } from "next/navigation";
import { cariKos, daftarKos } from "../../../lib/data";

export const instant = false;

// Fungsi wajib untuk merender halaman secara statis saat proses 'build'
export function generateStaticParams() {
  return daftarKos.map((kos) => ({ id: String(kos.id) }));
}

export default async function HalamanDetailKos({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validasi: Tolak URL seperti /abc atau /03
  if (!/^[1-9]\d*$/.test(id)) notFound(); 

  const kos = cariKos(Number(id));
  
  // Jika angka valid tapi ID kos tidak ada di pangkalan data, hentikan
  if (!kos) notFound();

  return (
    <main id="konten" className="mx-auto max-w-4xl p-4 py-10">
      <div className="mb-4">
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider">
          Kos {kos.tipe}
        </span>
        <span className="ml-3 text-sm font-medium text-gray-500">📍 {kos.lokasi}</span>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900">{kos.nama}</h1>
      <p className="mt-4 text-gray-700 leading-relaxed">{kos.deskripsi}</p>
      
      <h2 className="mt-10 text-xl font-bold border-b pb-2 mb-6">Daftar Kamar Tersedia</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {kos.daftarKamar.map((kamar) => (
          <div key={kamar.idKamar} className="border rounded-lg p-5 bg-white shadow-sm">
            <h3 className="font-bold text-lg text-gray-900">{kamar.tipeKamar}</h3>
            <p className="text-emerald-700 font-semibold mt-1">
              Rp {kamar.harga.toLocaleString('id-ID')} / bulan
            </p>
            <p className={`mt-3 text-sm font-bold ${kamar.tersedia ? 'text-green-600' : 'text-red-600'}`}>
              {kamar.tersedia ? 'Kamar Tersedia' : 'Penuh'}
            </p>
          </div>
        ))}
      </div>

      <Link href="/kos" className="mt-8 inline-block text-emerald-600 hover:underline font-medium">
        &larr; Kembali ke Katalog
      </Link>
    </main>
  );
}