import { CreateUserUseCase } from '@/application/users/use-cases/create-user-use-case'
import { PG_USER_REPOSITORY } from '@/domain/users/constants'
import { CREATE_USER_USE_CASE } from '@/infra/modules/users/constants'
import { container } from 'tsyringe'

// export const createUserUseCaseFactory = new CreateUserUseCase(container.resolve(PG_USER_REPOSITORY))
export const createUserUseCaseFactory = {
  token: CREATE_USER_USE_CASE,
  useFactory: () => new CreateUserUseCase(container.resolve(PG_USER_REPOSITORY))
}
