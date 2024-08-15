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
import { prisma } from '@/lib/prisma'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    await prisma.city.create({
      data: {
        id: 'sp',
        name: 'Sao Paulo',
        state: 'SP',
      },
    })

    const org = await prisma.org.create({
      data: {
        owner: 'Tester Tester',
        email: 'tester@tester.com',
        zip_code: '03434000',
        address: 'Rua Teste, 282',
        whatsapp: '11954545454',
        password_hash:
          '$2a$06$jf3T1xRbnBGEGTmYHqamkeB6Twmz5WtkfOiLRFTuC1YypadVNkjhS',
      },
    })

    const pet = await prisma.pet.create({
      data: {
        age: Age.ADULT,
        energy_level: EnergyLevels.HIGH,
        size: Size.LARGE,
        independency_level: IndependencyLevels.HIGH,
        name: `Thor 1`,
        about: 'God of dogs',
        environment_needed: EnvironmentNeededSizes.LARGE,
        city_id: 'sp',
        org_id: org.id,
      },
    })

    const anotherPet = await prisma.pet.create({
      data: {
        age: Age.ADULT,
        energy_level: EnergyLevels.HIGH,
        size: Size.LARGE,
        independency_level: IndependencyLevels.HIGH,
        name: `Thor 2`,
        about: 'God of dogs',
        environment_needed: EnvironmentNeededSizes.LARGE,
        city_id: 'sp',
        org_id: org.id,
      },
    })

    const response = await request(app.server).get('/pets/sp').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      pets: [
        expect.objectContaining({
          name: pet.name,
          id: pet.id,
        }),
        expect.objectContaining({
          name: anotherPet.name,
          id: anotherPet.id,
        }),
      ],
    })
  })
})
