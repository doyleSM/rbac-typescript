import { BaseEntity } from '@/domain/shared/entities/base/base-entity'

export class User extends BaseEntity {
  name: string
  email: string
  password: string
  status: string
  birth: string
}
