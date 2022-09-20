import { FindUserUseCase } from '@/application/users/use-cases/find-user-use-case'
import { PG_USER_REPOSITORY } from '@/domain/users/constants'
import { FIND_USER_USE_CASE } from '@/infra/modules/users/constants'
import { container } from 'tsyringe'

export const findUserUseCaseFactory = {
  token: FIND_USER_USE_CASE,
  useFactory: () => new FindUserUseCase(container.resolve(PG_USER_REPOSITORY))
}
