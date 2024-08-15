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
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    await prisma.city.create({
      data: {
        id: 'sp',
        name: 'Sao Paulo',
        state: 'SP',
      },
    })

    const { token, orgId } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: Age.ADULT,
        energy_level: EnergyLevels.HIGH,
        size: Size.LARGE,
        independency_level: IndependencyLevels.HIGH,
        name: 'Thor',
        about: 'God of dogs',
        environment_needed: EnvironmentNeededSizes.LARGE,
        city_id: 'sp',
        org_id: orgId,
      })

    expect(response.statusCode).toEqual(201)
  })
})
