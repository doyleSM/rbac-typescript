import { USER_ENTITY_MANAGER } from '@/domain/users/constants'
import { UserRepository } from '@/domain/users/repository/users.repository'
import { EntityRepository } from '@mikro-orm/postgresql'
import { inject, injectable } from 'tsyringe'
import { UserEntity } from '../../databases/postgres/mikro-orm/entities'

@injectable()
export class PgUserRepository implements UserRepository<UserEntity> {
  constructor (@inject(USER_ENTITY_MANAGER) private readonly userEntityManager: EntityRepository<UserEntity>) {}

  async create (item: UserEntity): Promise<any> {
    const user = this.userEntityManager.create(item)
    const teste = await this.userEntityManager.persistAndFlush(user)
    console.log(teste)
    return user
  }
}
