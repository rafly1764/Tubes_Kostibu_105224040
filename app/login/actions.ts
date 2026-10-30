"use server";

import { redirect } from "next/navigation";
import { buatSesi } from "@/lib/sesi";

export async function prosesLogin() {
  await buatSesi("admin-kosibu-123");
  redirect("/kos/tambah");
}