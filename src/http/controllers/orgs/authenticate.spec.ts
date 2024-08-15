import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      owner: 'Tester Tester',
      email: 'tester@tester.com',
      zip_code: '03434000',
      address: 'Rua Teste, 282',
      whatsapp: '11954545454',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'tester@tester.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
