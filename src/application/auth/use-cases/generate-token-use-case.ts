import { Encrypter } from '@/domain/auth/interfaces'
import { EncrypterType } from '@/domain/auth/types/encypter-type'
import { BaseUseCase } from '@/domain/shared/use-cases/base/base-use-case'

export class GenerateTokenUseCase implements BaseUseCase<EncrypterType, string> {
  constructor (
    readonly encrypter: Encrypter
  ) {}

  async execute ({ email, id, schema }: EncrypterType): Promise<string> {
    const token = await this.encrypter.encrypt({ email, id, schema: 'teste' })
    return token
  }
}
