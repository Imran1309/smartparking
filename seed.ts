import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.parkingSlot.count();
  if (count === 0) {
    console.log('Seeding 10 parking slots...');
    const slots = [];
    for (let i = 1; i <= 10; i++) {
      slots.push({
        slot_number: `A${i}`,
        status: 'AVAILABLE'
      });
    }
    await prisma.parkingSlot.createMany({ data: slots });
    console.log('Seeding complete.');
  } else {
    console.log('Slots already exist, skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
