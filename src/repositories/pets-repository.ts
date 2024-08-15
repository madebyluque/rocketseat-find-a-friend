import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Pet,
  Prisma,
  Size,
} from '@prisma/client'

export interface FetchPetsParams {
  city_id: string
  page: number
  age?: Age
  energy_level?: EnergyLevels
  size?: Size
  independency_level?: IndependencyLevels
  environment_needed?: EnvironmentNeededSizes
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  getById(id: string): Promise<Pet | null>
  fetchPets(params: FetchPetsParams): Promise<Pet[]>
}
