import { PrismaPetsRepository } from '@/repositories/prisma/pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(repository)

  return useCase
}
