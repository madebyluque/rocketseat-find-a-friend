import { Prisma, Pet } from '@prisma/client'
import { FetchPetsParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      age: data.age,
      energy_level: data.energy_level,
      size: data.size,
      independency_level: data.independency_level,
      name: data.name,
      about: data.about,
      environment_needed: data.environment_needed,
      created_at: new Date(),
      requirements: (data.requirements as string[]) ?? [],
      org_id: data.org_id,
      city_id: data.city_id,
    }

    this.items.push(pet)

    return pet
  }

  async getById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
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
    let pets = this.items.filter((item) => item.city_id === city_id)

    if (age !== null && age !== undefined) {
      pets = pets.filter((pet) => pet.age === age)
    }

    if (size !== null && size !== undefined) {
      pets = pets.filter((pet) => pet.size === size)
    }

    if (energy_level !== null && energy_level !== undefined) {
      pets = pets.filter((pet) => pet.energy_level === energy_level)
    }

    if (independency_level !== null && independency_level !== undefined) {
      pets = pets.filter((pet) => pet.independency_level === independency_level)
    }

    if (environment_needed !== null && environment_needed !== undefined) {
      pets = pets.filter((pet) => pet.environment_needed === environment_needed)
    }

    return pets.slice((page - 1) * 20, page * 20)
  }
}
