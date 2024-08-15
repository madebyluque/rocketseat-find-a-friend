import { PrismaPetsRepository } from '@/repositories/prisma/pets-repository'
import { FetchPetsUseCase } from '../fetch-pets'

export function makeFetchPetsUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new FetchPetsUseCase(repository)

  return useCase
}
