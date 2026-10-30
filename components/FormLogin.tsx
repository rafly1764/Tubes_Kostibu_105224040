"use client";

import { useState } from "react";
import { prosesLogin } from "@/app/login/actions";
import InputText from "./InputText";

export default function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setErrorMsg("Username tidak boleh kosong!");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Kata sandi minimal harus 6 karakter!");
      return;
    }

    setErrorMsg("");
    await prosesLogin();
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2">
      {errorMsg && (
        <div className="mb-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <InputText 
        label="Username" 
        type="text" 
        id="username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <InputText 
        label="Kata Sandi" 
        type="password" 
        id="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />

      <button 
        type="submit" 
        className="mt-4 w-full rounded-md bg-emerald-600 px-4 py-2 font-bold text-white transition hover:bg-emerald-700"
      >
        Masuk
      </button>
    </form>
  );
}