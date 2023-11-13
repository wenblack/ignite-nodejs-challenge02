import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function userRoute(app: FastifyInstance) {
  app.post('', async (req, res) => {
    const transactionBodySchema = z.object({
      email: z.string(),
    })
    const { email } = transactionBodySchema.parse(req.body)

    await prisma.user.create({
      data: {
        email,
      },
    })
    res.cookie('userID', email, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // One week
    })
    return res.status(201).send()
  })
}
