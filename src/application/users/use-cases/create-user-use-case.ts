import { BaseUseCase } from '@/domain/shared/use-cases/base/base-use-case'
import { UserStatusEnum } from '@/domain/users/constants/user-status.enum'
import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repository/users.repository'
import { CreateUserDto } from '@/infra/modules/users/dto'

export class CreateUserUseCase implements BaseUseCase<CreateUserDto, any> {
  constructor (readonly userRepository: UserRepository<User>) {}

  async execute (payload: CreateUserDto): Promise<any> {
    const data = { ...payload, ...{ status: UserStatusEnum.WAITING_CONFIRMATION } }
    const user = await this.userRepository.create(data)
    return user
  }
}
