import fastify from 'fastify'

export const app = fastify()

app.get('/hello', (_, reply) => {
  return reply.status(200).send({
    message: 'Hello!',
  })
})
