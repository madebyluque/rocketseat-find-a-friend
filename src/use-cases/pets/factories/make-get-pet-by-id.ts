import { PrismaPetsRepository } from '@/repositories/prisma/pets-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id'

export function makeGetPetById() {
  const repository = new PrismaPetsRepository()
  const useCase = new GetPetByIdUseCase(repository)

  return useCase
}
