import { PrismaOrgsRepository } from '@/repositories/prisma/orgs-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const repository = new PrismaOrgsRepository()
  const useCase = new CreateOrgUseCase(repository)

  return useCase
}
