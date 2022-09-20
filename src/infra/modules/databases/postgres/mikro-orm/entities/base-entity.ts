import { PrimaryKey, Property } from '@mikro-orm/core'
import { v4 as uuidv4 } from 'uuid'

export abstract class BaseEntity {
  @PrimaryKey()
    id?: string = uuidv4()

  @Property({ onCreate: () => new Date() })
    createdAt?: Date

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
    updatedAt?: Date
}
