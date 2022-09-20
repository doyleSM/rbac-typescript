import { BaseUseCase } from '@/domain/shared/use-cases/base/base-use-case'
import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repository/users.repository'
import { FindUserDto } from '../dto/find-user.dto'

export class FindUserUseCase implements BaseUseCase<FindUserDto, Promise<User | null>> {
  constructor (
    readonly userRepository: UserRepository<User>
  ) {}

  async execute ({ email }: FindUserDto): Promise<User | null> {
    return await this.userRepository.findByMail(email)
  }
}
