import FormKos from "@/components/FormKos";

export default function HalamanTambahKos() {
  return (
    <main className="container mx-auto p-6 md:p-10">
      <h1 className="mb-6 text-2xl font-bold">Tambah Data Kos Baru</h1>
      
      {/* Memanggil komponen formulir dari folder components */}
      <FormKos />
      
    </main>
  );
}