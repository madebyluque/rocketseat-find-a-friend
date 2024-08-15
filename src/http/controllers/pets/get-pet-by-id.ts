import { makeGetPetById } from '@/use-cases/pets/factories/make-get-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = fetchPetParamsSchema.parse(request.params)

  const useCase = makeGetPetById()

  const { pet } = await useCase.execute({
    id,
  })

  return reply.status(200).send({
    pet,
  })
}
