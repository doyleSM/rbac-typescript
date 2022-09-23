import { FindUserUseCase } from '@/application/users/use-cases/find-user-use-case'
import { HashComparer } from '@/domain/auth/interfaces'
import { BaseUseCase } from '@/domain/shared/use-cases/base/base-use-case'
import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repository/users.repository'
import { AuthenticateUserDto } from '../dto/authenticate-user.dto'
import { GenerateTokenUseCase } from './generate-token-use-case'

export class AuthenticateUserUseCase implements BaseUseCase<AuthenticateUserDto, string> {
  constructor (
    readonly userRepository: UserRepository<User>,
    readonly hashComparer: HashComparer,
    readonly findUserUseCase: FindUserUseCase,
    readonly generateTokenUseCase: GenerateTokenUseCase
  ) {}

  async execute ({ email, password }: AuthenticateUserDto): Promise<string> {
    const user = await this.findUserUseCase.execute({ email })
    if (user == null) {
      throw new Error('Usuario ou senhaa incorretos')
    }
    const passIsValid = await this.hashComparer.compare(password, user.password)
    // TODO
    // criar tipo de erro e lançar exceção
    // adicionar JWT
    if (!passIsValid) {
      throw new Error('Usuario ou senhaa incorretos')
    }
    const token = await this.generateTokenUseCase.execute({ email: user.email, id: user.id, schema: 'ANY_SCHEMA' })
    return token
  }
}
