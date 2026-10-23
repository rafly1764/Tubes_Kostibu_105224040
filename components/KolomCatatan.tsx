"use client";

import { useId, useState } from "react";

export default function KolomCatatan({ label }: { label: string }) {
  const id = useId();
  const [catatan, setCatatan] = useState("");

  return (
    <div className="rounded border border-dashed border-emerald-300 bg-emerald-50 p-3 text-sm">
      <label htmlFor={id} className="font-medium text-emerald-900">{label}</label>
      <input 
        id={id} 
        value={catatan}
        onChange={(e) => setCatatan(e.target.value)}
        placeholder="Catat di sini (misal: Harus AC)..."
        className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-gray-900 focus:border-emerald-500 focus:outline-none" 
      />
    </div>
  );
}