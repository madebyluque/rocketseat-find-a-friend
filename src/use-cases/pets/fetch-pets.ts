import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Pet,
  Size,
} from '@prisma/client'

interface FetchPetsUseCaseRequest {
  city_id: string
  page: number
  age?: Age
  energy_level?: EnergyLevels
  size?: Size
  independency_level?: IndependencyLevels
  environment_needed?: EnvironmentNeededSizes
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city_id,
    page,
    age,
    energy_level,
    size,
    independency_level,
    environment_needed,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.fetchPets({
      city_id,
      page,
      age,
      energy_level,
      size,
      independency_level,
      environment_needed,
    })

    return {
      pets,
    }
  }
}
