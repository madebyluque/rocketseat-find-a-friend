import fastify from 'fastify'
import { petsRoutes } from './http/controllers/pets/routes'
import { env } from './env'
import { ZodError } from 'zod'
import { orgsRoutes } from './http/controllers/orgs/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.get('/hello', (_, reply) => {
  return reply.status(200).send({
    message: 'Hello!',
  })
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(petsRoutes)
app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO: log to an external tool
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
