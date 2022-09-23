
import { container, instanceCachingFactory } from 'tsyringe'
import { FIND_USER_BY_TOKEN_USE_CASE, JWT_ADAPTER } from '@/infra/modules/auth/constants'
import { FindUserByTokenUseCase } from '@/application/auth/use-cases/find-user-by-token-use-case'
import { FIND_USER_USE_CASE } from '@/infra/modules/users/constants'

export const findUserByTokenUseCaseFactory = {
  token: FIND_USER_BY_TOKEN_USE_CASE,
  useFactory: instanceCachingFactory<FindUserByTokenUseCase>(() => new FindUserByTokenUseCase(
    container.resolve(JWT_ADAPTER),
    container.resolve(FIND_USER_USE_CASE)
  ))
}
