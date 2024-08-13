import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Pet,
  Size,
} from '@prisma/client'

interface CreatePetUseCaseRequest {
  age: Age
  energy_level: EnergyLevels
  size: Size
  independency_level: IndependencyLevels
  name: string
  about: string
  environment_needed: EnvironmentNeededSizes
  city_id: string
  org_id: string
  requirements?: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy_level,
    size,
    independency_level,
    name,
    about,
    environment_needed,
    city_id,
    org_id,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      age,
      energy_level,
      size,
      independency_level,
      name,
      about,
      environment_needed,
      city_id,
      org_id,
      requirements,
    })

    return {
      pet,
    }
  }
}
