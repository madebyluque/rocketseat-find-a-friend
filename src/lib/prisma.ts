import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

const main = async () => {
  await prisma.city.create({
    data: {
      id: 'sp',
      name: 'Sao Paulo',
      state: 'SP',
    },
  })
}

main().catch((err) => {
  console.warn('Error while seeding db', err)
})
