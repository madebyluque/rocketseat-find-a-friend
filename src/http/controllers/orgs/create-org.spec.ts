import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      owner: 'Tester Tester',
      email: 'tester@tester.com',
      zip_code: '03434000',
      address: 'Rua Teste, 282',
      whatsapp: '11954545454',
      password: '$2a$06$jf3T1xRbnBGEGTmYHqamkeB6Twmz5WtkfOiLRFTuC1YypadVNkjhS',
    })

    expect(response.statusCode).toEqual(201)
  })
})
