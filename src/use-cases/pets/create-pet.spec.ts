import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Size,
} from '@prisma/client'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('CreatePet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })
})
