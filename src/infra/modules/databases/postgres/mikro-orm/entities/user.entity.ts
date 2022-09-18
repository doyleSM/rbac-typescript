import { UserStatusEnum } from '@/domain/users/constants/user-status.enum'
import { Property, Unique, Enum, Entity } from '@mikro-orm/core'
import { Exclude } from 'class-transformer'
import { BaseEntity } from './base-entity'

@Entity()
export class UserEntity extends BaseEntity {
  @Property({
    nullable: false
  })
    name!: string

  @Property({
    nullable: false
  })
  @Unique()
    email!: string

  @Property({
    nullable: false
  })
    birth!: Date

  @Property({
    nullable: false
  })
  @Exclude()
    password!: string

  @Enum(() => UserStatusEnum)
  @Property({
    onCreate: () => UserStatusEnum.WAITING_CONFIRMATION
  })
    status!: UserStatusEnum
}
