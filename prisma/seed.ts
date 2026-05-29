import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=750&q=80`

const contestants = [
  {
    id: 'maria',
    name: 'Maria Silva',
    photoUrl: photo('photo-1534528741775-53994a69daeb'),
  },
  {
    id: 'ana',
    name: 'Ana Costa',
    photoUrl: photo('photo-1529626455594-4ff0802cfb7e'),
  },
  {
    id: 'julia',
    name: 'Julia Mendes',
    photoUrl: photo('photo-1488426862026-3ee34a7d66df'),
  },
  {
    id: 'beatriz',
    name: 'Beatriz Lima',
    photoUrl: photo('photo-1517841905240-472988babdf9'),
  },
  {
    id: 'carolina',
    name: 'Carolina Rocha',
    photoUrl: photo('photo-1524504388940-b1c1722653e1'),
  },
  {
    id: 'fernanda',
    name: 'Fernanda Alves',
    photoUrl: photo('photo-1529139574486-3b746655ecb7'),
  },
]

async function main() {
  for (const contestant of contestants) {
    await prisma.contestant.upsert({
      where: { id: contestant.id },
      update: contestant,
      create: contestant,
    })
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
