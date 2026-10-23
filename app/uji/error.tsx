"use client";

export default function GalatUji({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div role="alert" className="space-y-2 p-4 bg-red-50 border border-red-200 m-4 rounded">
      <p className="font-semibold text-red-700">Data uji gagal dimuat.</p>
      <p className="text-sm text-red-600">Pesan: {error.message}</p>
      {error.digest && <p className="text-sm text-red-600">Kode: {error.digest}</p>}
      <button onClick={() => retry()} className="mt-2 rounded bg-red-600 text-white px-3 py-1 text-sm font-bold">
        Coba lagi
      </button>
    </div>
  );
}