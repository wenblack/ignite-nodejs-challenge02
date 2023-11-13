import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const firstUserExample = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'johndoe@example.com',
      meals: {
        create: [
          {
            name: 'pre-workout ',
            description: '2 waxy scoops',
            isOnTheDiet: true,
          },
          {
            name: 'pos-workout ',
            description: '3 whey  + Carb',
            isOnTheDiet: true,
          },
          {
            name: 'launch ',
            description: 'hamburguer',
            isOnTheDiet: false,
          },
        ],
      },
    },
  })
  const secondUserExample = await prisma.user.upsert({
    where: { email: '' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      meals: {
        create: [
          {
            name: 'breakfast',
            description: '2 breads + juice',
            isOnTheDiet: false,
          },
          {
            name: 'pos-workout ',
            description: '3 whey  + Carb',
            isOnTheDiet: true,
          },
          {
            name: 'launch ',
            description: 'hamburguer',
            isOnTheDiet: false,
          },
        ],
      },
    },
  })
  console.log({ firstUserExample, secondUserExample })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
