import { dataKamar } from "../lib/data";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KartuKamar from "../components/KartuKamar";

export default function BerandaKosibu() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      
      <Header />

      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-16 px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Kos Putri Nyaman & Strategis</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-emerald-50">
          Kosibu menyediakan 5 kamar eksklusif khusus putri berukuran 3x3 meter. Lingkungan aman, tenang, harga terjangkau, serta berlokasi strategis sangat dekat dengan pasar dan alun-alun Demak.
        </p>
        <a href="#kamar" className="bg-white text-emerald-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition shadow-lg">
          Lihat Pilihan Kamar
        </a>
      </section>

      {/* Katalog Kamar */}
      <main id="kamar" className="max-w-6xl mx-auto px-4 py-16 grow">
        <h2 className="text-3xl font-bold text-center mb-10">Tipe Kamar Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataKamar.map((kamar) => (
            <KartuKamar key={kamar.id} kamar={kamar} />
          ))}
        </div>
      </main>

      <Footer />

    </div>
  );
}