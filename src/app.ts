import fastify from 'fastify'
import { petsRoutes } from './http/controllers/pets/routes'
import { env } from './env'
import { ZodError } from 'zod'

export const app = fastify()

app.get('/hello', (_, reply) => {
  return reply.status(200).send({
    message: 'Hello!',
  })
})

app.register(petsRoutes)

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
