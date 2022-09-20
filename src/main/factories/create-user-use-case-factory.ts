import { CreateUserUseCase } from '@/application/users/use-cases/create-user-use-case'
import { PG_USER_REPOSITORY } from '@/domain/users/constants'
import { BcryptAdapter } from '@/infra/modules/crypto/implementation/bcrypt-adapter'
import { CREATE_USER_USE_CASE } from '@/infra/modules/users/constants'
import { container } from 'tsyringe'

const salts = 12
const bcryptAdapter = new BcryptAdapter(salts)
export const createUserUseCaseFactory = {
  token: CREATE_USER_USE_CASE,
  useFactory: () => new CreateUserUseCase(container.resolve(PG_USER_REPOSITORY), bcryptAdapter)
}
