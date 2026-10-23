import DaftarKos from "../components/DaftarKos";
import { daftarKos } from "../lib/data";

export default function Beranda() {
  return (

    <main id="konten" className="grow mx-auto max-w-6xl p-4 w-full py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Selamat Datang di Kosibu</h1>
        <p className="mt-4 text-lg text-gray-600">
          Temukan kos idamanmu di Demak, Semarang, Kudus, dan sekitarnya.
        </p>
      </div>
      
      <section aria-labelledby="judul-daftar-kos">
        <h2 id="judul-daftar-kos" className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Rekomendasi Kos
        </h2>
        
        <DaftarKos daftar={daftarKos} />
      </section>
    </main>
  );
}