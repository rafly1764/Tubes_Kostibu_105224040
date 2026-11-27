import Link from "next/link"; // <-- Ini dia penyelamat garis merahnya!
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { daftarKos, getRentangHarga } from "../../lib/data";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <Header />
      
      <main className="grow max-w-6xl mx-auto px-4 py-10 w-full">
        {/* Wrapper flex untuk menyejajarkan Judul dan Tombol */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-emerald-600">Dasbor Admin Kosibu</h2>
          
          <Link 
            href="/tambah" 
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold shadow-sm transition-colors"
          >
            + Tambah Kos Baru
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">Status Properti Kos Saat Ini</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50 text-emerald-700">
                  <th className="p-3 border-b border-emerald-100 rounded-tl-lg">Nama Properti</th>
                  <th className="p-3 border-b border-emerald-100">Lokasi</th>
                  <th className="p-3 border-b border-emerald-100">Rentang Harga</th>
                  <th className="p-3 border-b border-emerald-100 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {daftarKos.map((kos) => {
                  // Cek ketersediaan kamar di kos ini
                  const adaKamarKosong = kos.daftarKamar.some(k => k.tersedia);
                  
                  return (
                    <tr key={kos.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">{kos.nama}</td>
                      <td className="p-3 text-gray-600">{kos.lokasi}</td>
                      <td className="p-3 text-gray-600">{getRentangHarga(kos.daftarKamar)}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${adaKamarKosong ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {adaKamarKosong ? 'Ada Kamar' : 'Penuh'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}