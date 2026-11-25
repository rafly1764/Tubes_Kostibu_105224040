"use client";

import { useActionState, useState } from "react";
import { tambahUlasan, type StatusForm } from "@/app/kos/actions";

export default function FormUlasan({ kosId }: { kosId: number }) {
  const [state, formAction, pending] = useActionState<StatusForm, FormData>(
    tambahUlasan.bind(null, kosId),
    {},
  );
  const [isi, setIsi] = useState("");
  const sisa = 280 - isi.length; // nilai turunan: dihitung setiap render

  return (
    <form
      action={formAction}
      className="mt-6 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
    >
      <h3 className="text-base font-bold text-gray-900">Tulis Ulasan</h3>

      <div>
        <label
          htmlFor="namaPenyewa"
          className="block text-sm font-medium text-gray-800"
        >
          Nama Penyewa
        </label>
        <input
          id="namaPenyewa"
          name="namaPenyewa"
          type="text"
          required
          placeholder="Contoh: Budi Santoso"
          className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm"
        />
        {state.galat?.namaPenyewa && (
          <p className="mt-1 text-xs text-red-600">
            {state.galat.namaPenyewa[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="komentar"
          className="block text-sm font-medium text-gray-800"
        >
          Ulasan
        </label>
        <textarea
          id="komentar"
          name="komentar"
          value={isi}
          maxLength={280}
          onChange={(e) => setIsi(e.target.value)}
          rows={3}
          placeholder="Bagikan pengalaman tinggal di kos ini..."
          className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 text-sm"
        />
        <p className="mt-1 text-sm text-gray-600">{sisa} karakter tersisa</p>
        {state.galat?.komentar && (
          <p className="mt-1 text-xs text-red-600">{state.galat.komentar[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="nilai"
          className="block text-sm font-medium text-gray-800"
        >
          Nilai (1-5)
        </label>
        <input
          id="nilai"
          name="nilai"
          type="number"
          min={1}
          max={5}
          defaultValue={5}
          required
          className="mt-1 block w-24 rounded border border-gray-300 bg-white px-3 py-2 text-sm"
        />
        {state.galat?.nilai && (
          <p className="mt-1 text-xs text-red-600">{state.galat.nilai[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {pending ? "Mengirim..." : "Kirim"}
      </button>

      {state.pesan && (
        <p role="status" className="text-sm font-medium text-emerald-700">
          {state.pesan}
        </p>
      )}
    </form>
  );
}
