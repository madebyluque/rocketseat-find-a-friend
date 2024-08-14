import { Prisma, Org, Role } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org: Org = {
      id: data.id ?? randomUUID(),
      owner: data.owner,
      email: data.email,
      zip_code: data.zip_code,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: Role.ORG,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
