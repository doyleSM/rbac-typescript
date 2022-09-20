import { AuthenticateUserDto } from '@/application/dto/authenticate-user.dto'
import { HashComparer } from '@/domain/crypto/interfaces'
import { BaseUseCase } from '@/domain/shared/use-cases/base/base-use-case'
import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repository/users.repository'

export class AuthenticateUserUseCase implements BaseUseCase<AuthenticateUserDto, any> {
  constructor (
    readonly userRepository: UserRepository<User>,
    readonly hashComparer: HashComparer
  ) {}

  async execute ({ email, password }: AuthenticateUserDto): Promise<User> {
    const user = await this.userRepository.findByMail(email)
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
    return user
  }
}
