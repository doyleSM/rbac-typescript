import { USER_ENTITY_MANAGER } from '@/domain/users/constants'
import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repository/users.repository'
import { EntityRepository } from '@mikro-orm/postgresql'
import { inject, injectable } from 'tsyringe'
import { UserEntity } from '../../databases/postgres/mikro-orm/entities/user.entity'

@injectable()
export class PgUserRepository implements UserRepository<User> {
  constructor (@inject(USER_ENTITY_MANAGER) private readonly userEntityManager: EntityRepository<UserEntity>) {}

  async findByMail (email: string): Promise<User | null> {
    const user = await this.userEntityManager.findOne({
      email
    })
    return user
  }

  async create (payload: User): Promise<User> {
    const user = this.userEntityManager.create(payload)
    await this.userEntityManager.persistAndFlush(user)
    return user
  }
}
