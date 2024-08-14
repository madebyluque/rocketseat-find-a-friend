import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    return await prisma.org.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Org | null> {
    return await prisma.org.findFirst({
      where: {
        email,
      },
    })
  }
}
