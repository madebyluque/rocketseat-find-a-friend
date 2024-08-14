import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

interface CreateOrgUseCaseRequest {
  owner: string
  email: string
  zip_code: string
  address: string
  whatsapp: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    owner,
    email,
    zip_code,
    address,
    whatsapp,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      owner,
      email,
      zip_code,
      address,
      whatsapp,
      password_hash,
    })

    return {
      org,
    }
  }
}
