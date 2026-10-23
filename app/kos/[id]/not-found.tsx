import Link from "next/link";

export default function KosTidakDitemukan() {
  return (
    <main id="konten" className="mx-auto max-w-4xl p-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Kos Tidak Ditemukan</h1>
      <p className="text-gray-600 text-lg mb-8">
        Maaf, ID kos yang Anda cari tidak tersedia atau URL tidak valid.
      </p>
      <Link href="/kos" className="inline-block rounded-md bg-emerald-600 px-6 py-3 text-white font-bold shadow-sm hover:bg-emerald-500 transition-colors">
        Kembali ke Katalog
      </Link>
    </main>
  );
}