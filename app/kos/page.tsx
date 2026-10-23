import DaftarKos from "../../components/DaftarKos";
import { daftarKos } from "../../lib/data";

export default function KatalogKos() {
  return (
    <main id="konten" className="mx-auto max-w-6xl p-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Katalog Semua Kos</h1>
      
      {/* Komponen ini akan memunculkan kartu-kartu Kosibu dari lib/data.ts */}
      <DaftarKos daftar={daftarKos} />
    </main>
  );
}