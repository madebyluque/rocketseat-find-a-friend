import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { UnauthorizedError } from '../errors/unauthorized-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      owner: 'Tester Tester',
      email: 'tester@tester.com',
      zip_code: '03434000',
      address: 'Rua Teste, 282',
      whatsapp: '11954545454',
      password_hash:
        '$2a$06$jf3T1xRbnBGEGTmYHqamkeB6Twmz5WtkfOiLRFTuC1YypadVNkjhS',
    })

    const { org } = await sut.execute({
      email: 'tester@tester.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should throw UnauthorizedError when passwords do not match', async () => {
    await orgsRepository.create({
      owner: 'Tester Tester',
      email: 'tester@tester.com',
      zip_code: '03434000',
      address: 'Rua Teste, 282',
      whatsapp: '11954545454',
      password_hash:
        '$2a$06$jf3T1xRbnBGEGTmYHqamkeB6Twmz5WtkfOiLRFTuC1YypadVNkjhS',
    })

    await expect(() =>
      sut.execute({
        email: 'tester@tester.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should throw UnauthorizedError when org does not exist', async () => {
    await expect(() =>
      sut.execute({
        email: 'tester@tester.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
