import { BaseEntity } from '@/domain/shared/entities/base/base-entity'
import { UserStatusEnum } from '../constants/user-status.enum'

export class User extends BaseEntity {
  name: string
  email: string
  password: string
  status: UserStatusEnum
  birth: Date
}
