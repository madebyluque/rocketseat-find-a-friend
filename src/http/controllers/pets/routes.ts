import { FastifyInstance } from 'fastify'
import { create } from './create-pet'
import { fetch } from './fetch-pets'
import { getById } from './get-pet-by-id'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT, verifyUserRole('ORG')] }, create)
  app.get('/pets', fetch)
  app.get('/pets/:id', getById)
}
