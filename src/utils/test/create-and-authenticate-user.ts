import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'tester@tester.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    orgId: org.id,
  }
}
