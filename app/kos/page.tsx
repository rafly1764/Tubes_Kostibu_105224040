import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

async function DaftarKosDb() {
  await connection();
  const daftarKos = await prisma.kos.findMany({
    orderBy: { id: "asc" },
    include: {
      _count: {
        select: { ulasan: true },
      },
    },
  });

  if (daftarKos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-500">Belum ada data kos di basis data.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {daftarKos.map((kos) => (
        <li key={kos.id}>
          <article className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">
                Kos {kos.tipe}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  kos.tersedia
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {kos.tersedia ? "Tersedia" : "Sementara tidak tersedia"}
              </span>
            </div>

            <h2 className="mb-2 text-lg font-bold text-gray-900">
              <Link
                href={`/kos/${kos.id}`}
                className="hover:text-emerald-600 hover:underline"
              >
                {kos.nama}
              </Link>
            </h2>

            <p className="mb-4 grow text-sm text-gray-600">{kos.deskripsi}</p>

            <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
              <span>{kos._count.ulasan} ulasan</span>
              <Link
                href={`/kos/${kos.id}`}
                className="font-semibold text-emerald-700 hover:underline"
              >
                Lihat detail &rarr;
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function KatalogKos() {
  return (
    <main id="konten" className="mx-auto max-w-6xl p-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Katalog Semua Kos</h1>
        <Link
          href="/tambah"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
        >
          + Tambah Kos
        </Link>
      </div>

      <Suspense
        fallback={
          <p className="text-sm text-gray-500">Memuat daftar kos...</p>
        }
      >
        <DaftarKosDb />
      </Suspense>
    </main>
  );
}
