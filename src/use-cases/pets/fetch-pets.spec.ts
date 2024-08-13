import { expect, describe, it, beforeEach } from 'vitest'
import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Size,
} from '@prisma/client'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from './fetch-pets'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('FetchPets use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)
  })

  it('should be able to fetch pets', async () => {
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

    await petsRepository.create({
      id: 'another-pet-id',
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

    await petsRepository.create({
      id: 'yet-another-pet-id',
      age: Age.ADULT,
      energy_level: EnergyLevels.HIGH,
      size: Size.SMALL,
      independency_level: IndependencyLevels.HIGH,
      name: 'Doguinho',
      about: 'Caramel dog',
      environment_needed: EnvironmentNeededSizes.LARGE,
      city_id: 'some-city-id-2',
      org_id: 'some-org-id',
    })

    const { pets } = await sut.execute({ city_id: 'some-city-id', page: 1 })

    expect(pets.length).toEqual(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'some-pet-id' }),
      expect.objectContaining({ id: 'another-pet-id' }),
    ])
  })

  it('should be able to fetch paginated pets list', async () => {
    for (let i = 1; i < 23; i++) {
      await petsRepository.create({
        id: `some-pet-id-${i}`,
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
    }

    const { pets } = await sut.execute({ city_id: 'some-city-id', page: 2 })

    expect(pets.length).toEqual(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'some-pet-id-21' }),
      expect.objectContaining({ id: 'some-pet-id-22' }),
    ])
  })
})
