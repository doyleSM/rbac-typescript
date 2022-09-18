import { container } from 'tsyringe'
import { useContainer } from 'routing-controllers'
import { TsyringeAdapter } from '@/infra/adapters'
import { CREATE_USER_USE_CASE } from '@/infra/modules/users/constants'
import PgMikroOrmDatabaseProvider from '@/infra/modules/databases/postgres/mikro-orm/provider/mikro-orm-provider'
import { PG_USER_REPOSITORY, USER_ENTITY_MANAGER } from '@/domain/users/constants'
import { UserEntity } from '@/infra/modules/databases/postgres/mikro-orm/entities'
import { UserRepository } from '@/domain/users/repository/users.repository'
import { PgUserRepository } from '@/infra/modules/users/repository/user-repository'
import { createUserUseCaseFactory } from '../factories/create-user-use-case-factory'

export const setupContainer = async (): Promise<void> => {
  useContainer(new TsyringeAdapter(container))

  const db = new PgMikroOrmDatabaseProvider()
  await db.connect()

  container.registerInstance(
    USER_ENTITY_MANAGER,
    db.getEntityManager().getRepository(UserEntity)
  )

  container.registerSingleton<UserRepository<UserEntity>>(
    PG_USER_REPOSITORY,
    PgUserRepository
  )

  container.register(
    CREATE_USER_USE_CASE,
    createUserUseCaseFactory
  )
}
