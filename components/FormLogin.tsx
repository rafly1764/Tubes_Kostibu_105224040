"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputText from "./InputText";

export default function FormLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Sisi Klien
    if (!username) {
      setErrorMsg("Username tidak boleh kosong!");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Kata sandi minimal harus 6 karakter!");
      return;
    }

    // Jika validasi lolos, pindah ke dasbor
    setErrorMsg("");
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2">
      {errorMsg && (
        <div className="p-3 mb-2 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {errorMsg}
        </div>
      )}

      <InputText label="Username" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <InputText label="Kata Sandi" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" className="mt-4 w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 transition">
        Masuk
      </button>
    </form>
  );
}