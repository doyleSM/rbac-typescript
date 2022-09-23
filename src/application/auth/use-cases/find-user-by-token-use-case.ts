import { FindUserUseCase } from '@/application/users/use-cases/find-user-use-case'
import { Decrypter } from '@/domain/auth/interfaces'
import { BaseUseCase } from '@/domain/shared/use-cases/base/base-use-case'
import { User } from '@/domain/users/entities/user'
import { FindUserByTokenDto } from '../dto/find-user-by-token.dto'

export class FindUserByTokenUseCase implements BaseUseCase<FindUserByTokenDto, User> {
  constructor (
    readonly decrypter: Decrypter,
    readonly findUserUseCase: FindUserUseCase
  ) {}

  async execute ({ token }: FindUserByTokenDto): Promise<User> {
    const { email } = await this.decrypter.decrypt(token)
    const user = await this.findUserUseCase.execute({ email })
    if (user == null) {
      throw new Error('Usuario nao encontrado')
    }
    return user
  }
}
