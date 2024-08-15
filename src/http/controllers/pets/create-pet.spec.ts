import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import {
  Age,
  EnergyLevels,
  EnvironmentNeededSizes,
  IndependencyLevels,
  Size,
} from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/orgs-repository'

let orgsRepository: OrgsRepository

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    orgsRepository = new PrismaOrgsRepository()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      owner: 'Tester Tester',
      email: 'tester@tester.com',
      zip_code: '03434000',
      address: 'Rua Teste, 282',
      whatsapp: '11954545454',
      password_hash:
        '$2a$06$jf3T1xRbnBGEGTmYHqamkeB6Twmz5WtkfOiLRFTuC1YypadVNkjhS',
    })

    const response = await request(app.server).post('/pets').send({
      age: Age.ADULT,
      energy_level: EnergyLevels.HIGH,
      size: Size.LARGE,
      independency_level: IndependencyLevels.HIGH,
      name: 'Thor',
      about: 'God of dogs',
      environment_needed: EnvironmentNeededSizes.LARGE,
      city_id: 'sp',
      org_id: org.id,
    })

    expect(response.statusCode).toEqual(201)
  })
})
