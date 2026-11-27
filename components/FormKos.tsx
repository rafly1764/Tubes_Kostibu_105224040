"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ubahKos, type StatusForm } from "@/app/kos/actions";

type DataKos = {
  id: number;
  nama: string;
  tipe: "Putra" | "Putri" | "Campuran";
  deskripsi: string;
  tersedia: boolean;
};

export default function FormKos({ kos }: { kos: DataKos }) {
  const [state, formAction, pending] = useActionState<StatusForm, FormData>(
    ubahKos.bind(null, kos.id),
    {},
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="nama" className="block font-medium text-gray-800">
          Nama Kos
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          defaultValue={kos.nama}
          required
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
        {state.galat?.nama && (
          <p className="mt-1 text-sm text-red-600">{state.galat.nama[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="tipe" className="block font-medium text-gray-800">
          Tipe Kos
        </label>
        <select
          id="tipe"
          name="tipe"
          defaultValue={kos.tipe}
          className="mt-1 block rounded border border-gray-300 px-3 py-2"
        >
          <option value="Putra">Putra</option>
          <option value="Putri">Putri</option>
          <option value="Campuran">Campuran</option>
        </select>
        {state.galat?.tipe && (
          <p className="mt-1 text-sm text-red-600">{state.galat.tipe[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="deskripsi" className="block font-medium text-gray-800">
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={4}
          defaultValue={kos.deskripsi}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
        {state.galat?.deskripsi && (
          <p className="mt-1 text-sm text-red-600">
            {state.galat.deskripsi[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="tersedia" className="block font-medium text-gray-800">
          Ketersediaan
        </label>
        <select
          key={String(kos.tersedia)}
          id="tersedia"
          name="tersedia"
          defaultValue={String(kos.tersedia)}
          className="mt-1 block rounded border border-gray-300 px-3 py-2"
        >
          <option value="true">Tersedia</option>
          <option value="false">Tidak tersedia</option>
        </select>
        {state.galat?.tersedia && (
          <p className="mt-1 text-sm text-red-600">{state.galat.tersedia[0]}</p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
        <Link
          href={`/kos/${kos.id}`}
          className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </Link>
      </div>

      {state.pesan && (
        <p
          role="status"
          className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800"
        >
          {state.pesan}
        </p>
      )}
    </form>
  );
}
