import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tentang | Kosibu" };

export default function HalamanTentang() {
  return (
    <main id="konten" className="mx-auto max-w-3xl p-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Tentang Kosibu</h1>
      <p className="mt-4 text-gray-700">
        Kosibu adalah platform agregator pencarian kos yang memudahkan Anda menemukan tempat tinggal nyaman, aman, dan sesuai anggaran di berbagai wilayah.
      </p>
    </main>
  );
}