"use client";

import { hapusKos } from "@/app/kos/actions";

export default function TombolHapusKos({ kosId }: { kosId: number }) {
  const hapusKosDenganId = hapusKos.bind(null, kosId);

  return (
    <form action={hapusKosDenganId}>
      <button
        type="submit"
        className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        Hapus
      </button>
    </form>
  );
}
