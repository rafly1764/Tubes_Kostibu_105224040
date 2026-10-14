interface KamarProps {
  kamar: {
    id: number;
    nama: string;
    ukuran: string;
    harga: number;
    fasilitas: string;
    tersedia: boolean;
  };
}

export default function KartuKamar({ kamar }: KamarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      <div className="p-6 grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold">{kamar.nama}</h3>
          <span className={`text-xs px-2 py-1 rounded font-bold border ${kamar.tersedia ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {kamar.tersedia ? 'Tersedia' : 'Penuh'}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
          📐 Ukuran: {kamar.ukuran}
        </p>
        <p className="text-gray-700 mb-6 text-sm">{kamar.fasilitas}</p>
        <div className="mt-auto">
          <p className="text-2xl font-black text-emerald-600">
            Rp {kamar.harga.toLocaleString('id-ID')}
            <span className="text-sm font-normal text-gray-500">/bulan</span>
          </p>
        </div>
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button 
          disabled={!kamar.tersedia} 
          className={`w-full py-2.5 rounded-lg font-bold transition-colors ${kamar.tersedia ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          {kamar.tersedia ? 'Pesan via WhatsApp' : 'Kamar Penuh'}
        </button>
      </div>
    </div>
  );
}