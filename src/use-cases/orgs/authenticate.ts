import { OrgsRepository } from '@/repositories/orgs-repository'
import { compare } from 'bcryptjs'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { Org } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new UnauthorizedError()
    }

    const doesPasswordsMatch = await compare(password, org.password_hash)

    if (!doesPasswordsMatch) {
      throw new UnauthorizedError()
    }

    return {
      org,
    }
  }
}
