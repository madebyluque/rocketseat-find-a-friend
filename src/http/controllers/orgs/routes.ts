import { FastifyInstance } from 'fastify'
import { create } from './create-org'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
}
