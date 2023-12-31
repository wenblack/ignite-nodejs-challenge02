import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { mealsRoutes } from './routes/meals'
import { userRoute } from './routes/user'
import { summaryRoute } from './routes/summary'
export const app = fastify()

app.register(cookie)
app.register(mealsRoutes, { prefix: '/meals' })
app.register(userRoute, { prefix: '/user' })
app.register(summaryRoute, { prefix: '/summary' })
