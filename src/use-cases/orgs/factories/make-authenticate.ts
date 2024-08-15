import { PrismaOrgsRepository } from '@/repositories/prisma/orgs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const repository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(repository)

  return useCase
}
