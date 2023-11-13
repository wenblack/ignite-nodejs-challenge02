import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function mealsRoutes(app: FastifyInstance) {
  app.get('', async (req) => {
    const email = req.cookies.userID

    const meals = await prisma.meal.findMany({
      where: {
        userEmail: email,
      },
    })
    return { meals }
  })

  app.get('/:id', async (req) => {
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

  /* app.get('/meals/summary', async (req) => {
    const sessionId = req.cookies.sessionId
    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()
    return { summary }
  })
*/
}
