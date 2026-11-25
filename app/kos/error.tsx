"use client";

import Link from "next/link";

export default function KosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-xl p-6">
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-800">
          Terjadi Kesalahan
        </h2>
        <p className="mt-2 text-sm text-red-700">
          {error.message || "Gagal memproses permintaan data kos."}
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Coba Lagi
          </button>
          <Link
            href="/kos"
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    </main>
  );
}