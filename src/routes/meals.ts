import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { AuthenticationMiddleware } from '../middlewares/auth'

const prisma = new PrismaClient()

export async function mealsRoutes(app: FastifyInstance) {
  app.get('', { preHandler: [AuthenticationMiddleware] }, async (req) => {
    const email = req.cookies.userID

    const meals = await prisma.meal.findMany({
      where: {
        userEmail: email,
      },
    })
    return { meals }
  })

  app.get('/:id', { preHandler: [AuthenticationMiddleware] }, async (req) => {
    const email = req.cookies.userID
    const transactionParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = transactionParamsSchema.parse(req.params)
    const meal = await prisma.meal.findUnique({
      where: {
        id,
        userEmail: email,
      },
      select: {
        name: true,
        description: true,
        createdAt: true,
        isOnTheDiet: true,
      },
    })
    return { meal }
  })

  app.post('', async (req, res) => {
    const email = req.cookies.userID
    const transactionBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnTheDiet: z.boolean(),
    })
    const { name, description, isOnTheDiet } = transactionBodySchema.parse(
      req.body,
    )

    const hasUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const lastHealthFoodStreak = Number(hasUser?.healthFoodStreak)
    await prisma.meal.create({
      data: {
        name,
        description,
        isOnTheDiet,
        userEmail: String(hasUser?.email),
      },
    })

    if (isOnTheDiet === false) {
      await prisma.user.update({
        where: { email: hasUser?.email },
        data: {
          healthFoodStreak: 0,
        },
      })
    } else if (isOnTheDiet === true) {
      await prisma.user.update({
        where: { email: hasUser?.email },
        data: {
          healthFoodStreak: lastHealthFoodStreak + 1,
        },
      })
    }
    return res.status(201).send()
  })

  app.delete(
    '/:id',
    { preHandler: [AuthenticationMiddleware] },
    async (req) => {
      const email = req.cookies.userID
      const transactionParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = transactionParamsSchema.parse(req.params)
      const hasUser = await prisma.user.findUnique({
        where: {
          email,
        },
      })
      const lastHealthFoodStreak = Number(hasUser?.healthFoodStreak)
      const deletedMeal = await prisma.meal.delete({
        where: {
          id,
          userEmail: email,
        },
      })
      if (lastHealthFoodStreak >= 1 && deletedMeal.isOnTheDiet) {
        await prisma.user.update({
          where: { email: hasUser?.email },
          data: {
            healthFoodStreak: lastHealthFoodStreak - 1,
          },
        })
      }

      return { message: 'Meal deleted!' }
    },
  )
}
