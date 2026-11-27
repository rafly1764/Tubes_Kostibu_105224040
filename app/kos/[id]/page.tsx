import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import FormUlasan from "@/components/FormUlasan";
import TombolHapusKos from "@/components/TombolHapusKos";

async function DetailKosDb({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) notFound();

  const kos = await prisma.kos.findUnique({
    where: { id: Number(id) },
    include: {
      ulasan: {
        orderBy: { dibuatPada: "desc" },
      },
    },
  });

  if (!kos) notFound();

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            Kos {kos.tipe}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              kos.tersedia
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {kos.tersedia ? "Tersedia" : "Sementara tidak tersedia"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/kos/${kos.id}/edit`}
            className="rounded border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Ubah
          </Link>
          <TombolHapusKos kosId={kos.id} />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900">{kos.nama}</h1>
      <p className="mt-4 leading-relaxed text-gray-700">{kos.deskripsi}</p>

      <section className="mt-8 border-t pt-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Ulasan Penyewa ({kos.ulasan.length})
        </h2>

        {kos.ulasan.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada ulasan untuk kos ini.
          </p>
        ) : (
          <ul className="space-y-3">
            {kos.ulasan.map((u) => (
              <li
                key={u.id}
                className="rounded-lg border border-gray-100 bg-gray-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">
                    {u.namaPenyewa}
                  </span>
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                    Nilai: {u.nilai}/5
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700">{u.komentar}</p>
              </li>
            ))}
          </ul>
        )}

        <FormUlasan kosId={kos.id} />
      </section>

      <Link
        href="/kos"
        className="mt-8 inline-block font-medium text-emerald-600 hover:underline"
      >
        &larr; Kembali ke Katalog
      </Link>
    </article>
  );
}

export default function HalamanDetailKos({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main id="konten" className="mx-auto max-w-4xl p-4 py-10">
      <Suspense
        fallback={<p className="text-sm text-gray-500">Memuat detail kos...</p>}
      >
        <DetailKosDb params={params} />
      </Suspense>
    </main>
  );
}
