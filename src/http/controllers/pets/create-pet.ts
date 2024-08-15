import { makeCreatePetUseCase } from '@/use-cases/pets/factories/make-create-pet'
import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Size,
} from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    age: z.nativeEnum(Age),
    energy_level: z.nativeEnum(EnergyLevels),
    size: z.nativeEnum(Size),
    independency_level: z.nativeEnum(IndependencyLevels),
    name: z.string(),
    about: z.string(),
    environment_needed: z.nativeEnum(EnvironmentNeededSizes),
    city_id: z.string(),
    org_id: z.string(),
    requirements: z.string().array().optional(),
  })

  const {
    age,
    energy_level,
    size,
    independency_level,
    name,
    about,
    environment_needed,
    city_id,
    org_id,
    requirements,
  } = createPetBodySchema.parse(request.body)

  const useCase = makeCreatePetUseCase()

  await useCase.execute({
    age,
    energy_level,
    size,
    independency_level,
    name,
    about,
    environment_needed,
    city_id,
    org_id,
    requirements,
  })

  return reply.status(201).send()
}
