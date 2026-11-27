"use client"; // error boundary harus Client Component

import { useEffect } from "react";

export default function GalatKos({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="mx-auto my-8 max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-red-800">Item gagal diproses</h2>
      <p className="mt-2 text-sm text-gray-700">
        Terjadi kesalahan saat memproses data kos. Data mungkin sudah dihapus
        atau berubah di tab lain.
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Kode rujukan: {error.digest ?? "tidak ada"}
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-4 rounded border border-red-300 bg-white px-4 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-100"
      >
        Coba lagi
      </button>
    </div>
  );
}
