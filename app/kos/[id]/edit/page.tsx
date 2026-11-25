import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import FormKos from "@/components/FormKos";

async function EditKosDb({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) notFound();

  const kos = await prisma.kos.findUnique({
    where: { id: Number(id) },
  });

  if (!kos) notFound();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Ubah Data Kos: {kos.nama}
        </h1>
        <Link
          href={`/kos/${kos.id}`}
          className="text-sm font-medium text-emerald-600 hover:underline"
        >
          &larr; Kembali ke Detail
        </Link>
      </div>

      <FormKos kos={kos} />
    </div>
  );
}

export default function HalamanEditKos({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main id="konten" className="mx-auto max-w-2xl p-4 py-10">
      <Suspense
        fallback={<p className="text-sm text-gray-500">Memuat formulir...</p>}
      >
        <EditKosDb params={params} />
      </Suspense>
    </main>
  );
}
