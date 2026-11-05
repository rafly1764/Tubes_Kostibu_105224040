"use client";

import { useState } from "react";
import { tambahKos } from "../actions";

export default function TambahKosPage() {
  const [pesan, setPesan] = useState("");

  async function handleSubmit(formData: FormData) {
    const hasil = await tambahKos(formData);
    if (hasil?.error) {
      setPesan(hasil.error); // Menangkap dan menampilkan pesan error dari actions.ts
    } else {
      setPesan("Kos Berhasil Ditambahkan!");
    }
  }

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Tes Pemicu Galat P2002 (Modul 6)</h1>
      <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        {/* Sengaja kita isi bawaannya "Kos Mawar" agar langsung bentrok dengan data seed */}
        <input name="nama" placeholder="Nama Kos" defaultValue="Kos Mawar" required style={{ padding: "8px" }} />
        
        <select name="tipe" style={{ padding: "8px" }}>
          <option value="Putra">Putra</option>
          <option value="Putri">Putri</option>
          <option value="Campuran">Campuran</option>
        </select>
        
        <input name="deskripsi" placeholder="Deskripsi" defaultValue="Tes input" required style={{ padding: "8px" }} />
        
        <button type="submit" style={{ padding: "10px", background: "black", color: "white", cursor: "pointer" }}>
          Simpan Kos
        </button>
      </form>
      
      {/* Teks error warna merah akan muncul di sini */}
      {pesan && <p style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}>{pesan}</p>}
    </div>
  );
}   