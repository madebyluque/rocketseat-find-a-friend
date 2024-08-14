import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('CreatePet use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const { org } = await sut.execute({
      owner: 'Tester Tester',
      email: 'tester@tester.com',
      zip_code: '03434000',
      address: 'Rua Teste, 282',
      whatsapp: '11954545454',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should throw OrgAlreadyExistsError when org already exists', async () => {
    await sut.execute({
      owner: 'Tester Tester',
      email: 'tester@tester.com',
      zip_code: '03434000',
      address: 'Rua Teste, 282',
      whatsapp: '11954545454',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        owner: 'Tester Tester',
        email: 'tester@tester.com',
        zip_code: '03434000',
        address: 'Rua Teste, 282',
        whatsapp: '11954545454',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
