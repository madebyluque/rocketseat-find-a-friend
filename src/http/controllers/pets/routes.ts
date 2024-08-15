import { FastifyInstance } from 'fastify'
import { create } from './create-pet'
import { fetch } from './fetch-pets'
import { getById } from './get-pet-by-id'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)
  app.get('/pets', fetch)
  app.get('/pets/:id', getById)
}
