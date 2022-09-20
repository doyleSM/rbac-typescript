import { CreateUserUseCase } from '@/application/users/use-cases/create-user-use-case'
import { PG_USER_REPOSITORY } from '@/domain/users/constants'
import { BCRYPT_ADAPTER } from '@/infra/modules/auth/constants'
import { CREATE_USER_USE_CASE } from '@/infra/modules/users/constants'
import { container } from 'tsyringe'

export const createUserUseCaseFactory = {
  token: CREATE_USER_USE_CASE,
  useFactory: () => new CreateUserUseCase(container.resolve(PG_USER_REPOSITORY), container.resolve(BCRYPT_ADAPTER))
}
