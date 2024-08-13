import { expect, describe, it, beforeEach } from 'vitest'
import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Size,
} from '@prisma/client'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetByIdUseCase } from './get-pet-by-id'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('GetPetById use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get a pet by its id', async () => {
    await petsRepository.create({
      id: 'some-pet-id',
      age: Age.ADULT,
      energy_level: EnergyLevels.HIGH,
      size: Size.SMALL,
      independency_level: IndependencyLevels.HIGH,
      name: 'Doguinho',
      about: 'Caramel dog',
      environment_needed: EnvironmentNeededSizes.LARGE,
      city_id: 'some-city-id',
      org_id: 'some-org-id',
    })

    const { pet } = await sut.execute({ id: 'some-pet-id' })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should throw ResourceNotFoundError when pet is not found', async () => {
    await expect(() =>
      sut.execute({ id: 'some-pet-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
