import { FastifyReply, FastifyRequest } from 'fastify'

export async function AuthenticationMiddleware(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const userID = req.cookies.userID

  if (!userID) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
}
