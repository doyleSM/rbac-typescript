import { CreateUserDto } from '@/application/dto/create-user.dto'
import { Hasher } from '@/domain/crypto/interfaces'
import { BaseUseCase } from '@/domain/shared/use-cases/base/base-use-case'
import { UserStatusEnum } from '@/domain/users/constants/user-status.enum'
import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repository/users.repository'

export class CreateUserUseCase implements BaseUseCase<CreateUserDto, any> {
  constructor (
    readonly userRepository: UserRepository<User>,
    readonly hasher: Hasher
  ) {}

  async execute ({ birth, email, name, password }: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hasher.hash(password)
    const user = await this.userRepository.create({
      birth: new Date(birth),
      email,
      name,
      password: hashedPassword,
      status: UserStatusEnum.WAITING_CONFIRMATION
    })
    return user
  }
}
