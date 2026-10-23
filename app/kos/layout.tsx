import KolomCatatan from "../../components/KolomCatatan";

export default function LayoutKos({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl p-4 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
      
      {/* Panel samping (Sidebar) yang berisi Kolom Catatan */}
      <aside aria-label="Panel Kos" className="mb-6 space-y-3">
        <p className="font-semibold text-gray-900">Panel Samping</p>
        <KolomCatatan label="Catatan Kriteria Idaman:" />
      </aside>
      
      {/* Area utama untuk menampilkan daftar kartu kos */}
      <div className="min-w-0">{children}</div>
      
    </div>
  );
}