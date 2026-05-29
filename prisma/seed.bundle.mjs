"use strict";

// prisma/seed.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var contestants = [
  {
    id: "maria",
    name: "Maria Silva",
    photoUrl: "https://picsum.photos/seed/miss-maria/600/750"
  },
  {
    id: "ana",
    name: "Ana Costa",
    photoUrl: "https://picsum.photos/seed/miss-ana/600/750"
  },
  {
    id: "julia",
    name: "Julia Mendes",
    photoUrl: "https://picsum.photos/seed/miss-julia/600/750"
  },
  {
    id: "beatriz",
    name: "Beatriz Lima",
    photoUrl: "https://picsum.photos/seed/miss-beatriz/600/750"
  },
  {
    id: "carolina",
    name: "Carolina Rocha",
    photoUrl: "https://picsum.photos/seed/miss-carolina/600/750"
  },
  {
    id: "fernanda",
    name: "Fernanda Alves",
    photoUrl: "https://picsum.photos/seed/miss-fernanda/600/750"
  }
];
async function main() {
  for (const contestant of contestants) {
    await prisma.contestant.upsert({
      where: { id: contestant.id },
      update: contestant,
      create: contestant
    });
  }
}
main().then(() => prisma.$disconnect()).catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
