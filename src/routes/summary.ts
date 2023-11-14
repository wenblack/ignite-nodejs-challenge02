import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function summaryRoute(app: FastifyInstance) {
  app.get('', async (req, res) => {
    const email = req.cookies.userID
    const hasUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: { meals: true },
    })

    const healthMeals = Number(hasUser?.healthFoodStreak)
    const total = Number(hasUser?.meals.length)
    const totalHealthMeals = await prisma.meal.findMany({
      where: {
        userEmail: email,
        isOnTheDiet: true,
      },
    })
    const junkMeals = total - totalHealthMeals.length

    return {
      summary: {
        totalMeals: total,
        healthMeals: totalHealthMeals.length,
        junkMeals,
        healthFoodStreak: healthMeals,
      },
    }
  })
}
