import { makeCreateOrgUseCase } from '@/use-cases/orgs/factories/make-create-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    owner: z.string(),
    email: z.string().email(),
    zip_code: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  })

  const { owner, email, zip_code, address, whatsapp, password } =
    createOrgBodySchema.parse(request.body)

  const useCase = makeCreateOrgUseCase()

  await useCase.execute({ owner, email, zip_code, address, whatsapp, password })

  return reply.status(201).send()
}
