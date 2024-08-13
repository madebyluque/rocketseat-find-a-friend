import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
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
}
