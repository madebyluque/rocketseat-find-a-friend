import { makeFetchPetsUseCase } from '@/use-cases/pets/factories/make-fetch-pets'
import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Size,
} from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetQuerySchema = z.object({
    age: z.nativeEnum(Age).optional(),
    energy_level: z.nativeEnum(EnergyLevels).optional(),
    size: z.nativeEnum(Size).optional(),
    independency_level: z.nativeEnum(IndependencyLevels).optional(),
    environment_needed: z.nativeEnum(EnvironmentNeededSizes).optional(),
    page: z.coerce.number().default(1),
    city_id: z.string(),
  })

  const {
    age,
    energy_level,
    size,
    independency_level,
    environment_needed,
    page,
    city_id,
  } = fetchPetQuerySchema.parse(request.query)

  const useCase = makeFetchPetsUseCase()

  const { pets } = await useCase.execute({
    page,
    age,
    energy_level,
    size,
    independency_level,
    environment_needed,
    city_id,
  })

  return reply.status(200).send({
    pets,
  })
}
