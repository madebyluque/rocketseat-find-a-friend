import {
  Prisma,
  Pet,
  Age,
  Size,
  EnergyLevels,
  IndependencyLevels,
  EnvironmentNeededSizes,
} from '@prisma/client'
import { FetchPetsParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

interface PetsFilter {
  city_id: string
  age?: Age
  size?: Size
  energy_level?: EnergyLevels
  independency_level?: IndependencyLevels
  environment_needed?: EnvironmentNeededSizes
}

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async getById(id: string): Promise<Pet | null> {
    return await prisma.pet.findUnique({
      where: {
        id,
      },
    })
  }

  async fetchPets({
    city_id,
    page,
    age,
    energy_level,
    size,
    independency_level,
    environment_needed,
  }: FetchPetsParams): Promise<Pet[]> {
    const filters: PetsFilter = {
      city_id,
    }

    if (age !== null && age !== undefined) {
      filters.age = age
    }

    if (size !== null && size !== undefined) {
      filters.size = size
    }

    if (energy_level !== null && energy_level !== undefined) {
      filters.energy_level = energy_level
    }

    if (independency_level !== null && independency_level !== undefined) {
      filters.independency_level = independency_level
    }

    if (environment_needed !== null && environment_needed !== undefined) {
      filters.environment_needed = environment_needed
    }

    const pets = await prisma.pet.findMany({
      where: filters,
      skip: (page - 1) * 20,
      take: 20,
    })

    return pets
  }
}
