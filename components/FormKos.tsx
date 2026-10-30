"use client";

import { useActionState } from "react";
import { simpanKos } from "@/app/kos/actions";

export default function FormKos() {
  const [status, aksi, pending] = useActionState(simpanKos, {});
  
  const g = status.galat;
  const n = status.nilai;

  return (
    <form action={aksi} className="max-w-xl space-y-4 rounded bg-white p-6 shadow">
      
      <div>
        <label htmlFor="nama" className="font-medium text-gray-700">Nama Kos</label>
        <input 
          id="nama" 
          name="nama" 
          required 
          minLength={5}
          defaultValue={n?.nama}
          className="mt-1 block w-full rounded border px-3 py-2 border-gray-300"
          aria-invalid={!!g?.nama} 
          aria-describedby="galat-nama" 
        />
        <p id="galat-nama" className="mt-1 text-sm font-medium text-red-600">
          {g?.nama?.[0]} 
        </p>
      </div>

      <div>
        <label htmlFor="tipe" className="font-medium text-gray-700">Tipe Kos</label>
        <select
          id="tipe"
          name="tipe"
          required
          defaultValue={n?.tipe || ""}
          className="mt-1 block w-full rounded border px-3 py-2 border-gray-300 bg-white"
          aria-invalid={!!g?.tipe}
          aria-describedby="galat-tipe"
        >
          <option value="" disabled>Pilih Tipe Kos</option>
          <option value="putra">Putra</option>
          <option value="putri">Putri</option>
          <option value="campur">Campur</option>
        </select>
        <p id="galat-tipe" className="mt-1 text-sm font-medium text-red-600">
          {g?.tipe?.[0]}
        </p>
      </div>

      <div>
        <label htmlFor="deskripsi" className="font-medium text-gray-700">Deskripsi</label>
        <textarea 
          id="deskripsi" 
          name="deskripsi" 
          required 
          minLength={20}
          defaultValue={n?.deskripsi}
          rows={4}
          className="mt-1 block w-full rounded border px-3 py-2 border-gray-300"
          aria-invalid={!!g?.deskripsi} 
          aria-describedby="galat-deskripsi" 
        />
        <p id="galat-deskripsi" className="mt-1 text-sm font-medium text-red-600">
          {g?.deskripsi?.[0]} 
        </p>
      </div>

      <button 
        type="submit" 
        disabled={pending}
        className="rounded bg-emerald-600 px-4 py-2 font-bold text-white disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Simpan Kos"}
      </button>

      <p role="status" className="font-bold text-red-600">{status.pesan}</p>
    </form>
  );
}