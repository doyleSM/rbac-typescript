import { container } from 'tsyringe'
import { useContainer } from 'routing-controllers'
import { TsyringeAdapter } from '@/infra/adapters'
import { CREATE_USER_USE_CASE, AUTHENTICATE_USER_USE_CASE, FIND_USER_USE_CASE } from '@/infra/modules/users/constants'
import PgMikroOrmDatabaseProvider from '@/infra/modules/databases/postgres/mikro-orm/provider/mikro-orm-provider'
import { PG_USER_REPOSITORY, USER_ENTITY_MANAGER } from '@/domain/users/constants'
import { UserEntity } from '@/infra/modules/databases/postgres/mikro-orm/entities'
import { UserRepository } from '@/domain/users/repository/users.repository'
import { PgUserRepository } from '@/infra/modules/users/repository/user-repository'

import { findUserUseCaseFactory } from '../factories/users/find-user-use-case-factory'
import { createUserUseCaseFactory } from '../factories/users/create-user-use-case-factory'
import { authenticateUserUseCaseFactory } from '../factories/auth/authenticate-user-use-case-factory'
import { BCRYPT_ADAPTER, GENERATE_TOKEN_USE_CASE, JWT_ADAPTER } from '@/infra/modules/auth/constants'
import { bcryptAdapterFactory } from '../factories/auth/bcrypt-adapter-factory'
import { jwtAdapterFactory } from '../factories/auth/jwt-adapter-factory'
import { generateTokenUseCaseFactory } from '../factories/auth/generate-token-use-case-factory'

export const setupContainer = async (): Promise<void> => {
  useContainer(new TsyringeAdapter(container))

  const db = new PgMikroOrmDatabaseProvider()
  await db.connect()

  container.registerInstance(
    USER_ENTITY_MANAGER,
    db.getEntityManager().getRepository(UserEntity)
  )

  container.register(
    BCRYPT_ADAPTER,
    bcryptAdapterFactory
  )
  container.register(
    JWT_ADAPTER,
    jwtAdapterFactory
  )

  container.registerSingleton<UserRepository<UserEntity>>(
    PG_USER_REPOSITORY,
    PgUserRepository
  )

  container.register(
    CREATE_USER_USE_CASE,
    createUserUseCaseFactory
  )

  container.register(
    FIND_USER_USE_CASE,
    findUserUseCaseFactory
  )

  container.register(
    AUTHENTICATE_USER_USE_CASE,
    authenticateUserUseCaseFactory
  )

  container.register(
    GENERATE_TOKEN_USE_CASE,
    generateTokenUseCaseFactory
  )
}
