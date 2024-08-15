import { FastifyInstance } from 'fastify'
import { create } from './create-pet'
import { fetch } from './fetch-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)
  app.get('/pets/:cityId', fetch)
}
