import { AuthenticateUserUseCase } from '@/application/auth/use-cases/authenticate-user-use-case'
import { PG_USER_REPOSITORY } from '@/domain/users/constants'
import { BCRYPT_ADAPTER, GENERATE_TOKEN_USE_CASE } from '@/infra/modules/auth/constants'
import { AUTHENTICATE_USER_USE_CASE, FIND_USER_USE_CASE } from '@/infra/modules/users/constants'
import { container } from 'tsyringe'

export const authenticateUserUseCaseFactory = {
  token: AUTHENTICATE_USER_USE_CASE,
  useFactory: () => new AuthenticateUserUseCase(
    container.resolve(PG_USER_REPOSITORY),
    container.resolve(BCRYPT_ADAPTER),
    container.resolve(FIND_USER_USE_CASE),
    container.resolve(GENERATE_TOKEN_USE_CASE)
  )
}
