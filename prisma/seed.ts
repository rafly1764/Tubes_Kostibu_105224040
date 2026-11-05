import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { dataAwal } from "./data-awal";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  for (const data of dataAwal) {
    const kos = await prisma.kos.upsert({
      where: { nama: data.nama },
      update: {},
      create: data,
    });

    await prisma.ulasan.upsert({
      where: { kosId_namaPenyewa: { kosId: kos.id, namaPenyewa: "Pengguna Uji" } },
      update: {},
      create: { 
        kosId: kos.id, 
        namaPenyewa: "Pengguna Uji", 
        nilai: 4, 
        komentar: "Ulasan sintetis untuk pengujian." 
      },
    });
  }

  const jKos = await prisma.kos.count();
  const jUlasan = await prisma.ulasan.count();
  console.log(`Seed selesai: ${jKos} kos, ${jUlasan} ulasan`);
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());