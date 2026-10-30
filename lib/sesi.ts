import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const penyimpananSesi = new Map<string, { idPengguna: string }>();

export async function buatSesi(idPengguna: string) {
  const idSesi = randomUUID();
  penyimpananSesi.set(idSesi, { idPengguna });

  const brankasCookie = await cookies();
  brankasCookie.set("sesi_kosibu", idSesi, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 28800,
    path: "/",
  });
}

export async function bacaSesi() {
  const brankasCookie = await cookies();
  const idSesi = brankasCookie.get("sesi_kosibu")?.value;
  
  if (!idSesi) return null;
  return penyimpananSesi.get(idSesi) || null;
}

export async function hapusSesi() {
  const brankasCookie = await cookies();
  const idSesi = brankasCookie.get("sesi_kosibu")?.value;
  
  if (idSesi) penyimpananSesi.delete(idSesi);
  brankasCookie.delete("sesi_kosibu");
}