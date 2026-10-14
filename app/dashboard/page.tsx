import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { dataKamar } from "../../lib/data";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <Header />
      
      <main className="grow max-w-6xl mx-auto px-4 py-10 w-full">
        <h2 className="text-3xl font-bold text-emerald-600 mb-6">Dasbor Admin Kosibu</h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">Status Kamar Saat Ini</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50 text-emerald-700">
                  <th className="p-3 border-b border-emerald-100 rounded-tl-lg">Nama Kamar</th>
                  <th className="p-3 border-b border-emerald-100">Harga</th>
                  <th className="p-3 border-b border-emerald-100 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {dataKamar.map((kamar) => (
                  <tr key={kamar.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium">{kamar.nama}</td>
                    <td className="p-3 text-gray-600">Rp {kamar.harga.toLocaleString('id-ID')}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-1 rounded font-bold ${kamar.tersedia ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {kamar.tersedia ? 'Tersedia' : 'Penuh'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}