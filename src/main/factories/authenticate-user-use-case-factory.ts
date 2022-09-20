import { AuthenticateUserUseCase } from '@/application/users/use-cases/authenticate-user-use-case'
import { PG_USER_REPOSITORY } from '@/domain/users/constants'
import { BcryptAdapter } from '@/infra/modules/crypto/implementation/bcrypt-adapter'
import { AUTHENTICATE_USER_USE_CASE } from '@/infra/modules/users/constants'
import { container } from 'tsyringe'

const salts = 12
const bcryptAdapter = new BcryptAdapter(salts)
export const authenticateUserUseCaseFactory = {
  token: AUTHENTICATE_USER_USE_CASE,
  useFactory: () => new AuthenticateUserUseCase(container.resolve(PG_USER_REPOSITORY), bcryptAdapter)
}
