import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const firstUserExample = await prisma.user.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      email: 'johndoe@example.com',
      meals: {
        create: [
          {
            name: 'launch ',
            description: 'hamburguer',
            isOnTheDiet: false,
          },
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
        ],
      },
      healthFoodStreak: 2,
    },
  })
  const secondUserExample = await prisma.user.upsert({
    where: { email: '' },
    update: {},
    create: {
      email: 'user@example.com',
      meals: {
        create: [
          {
            name: 'breakfast',
            description: '2 breads + juice',
            isOnTheDiet: false,
          },
          {
            name: 'launch ',
            description: 'hamburguer',
            isOnTheDiet: false,
          },
          {
            name: 'pos-workout ',
            description: '3 whey  + Carb',
            isOnTheDiet: true,
          },
        ],
      },
      healthFoodStreak: 1,
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
