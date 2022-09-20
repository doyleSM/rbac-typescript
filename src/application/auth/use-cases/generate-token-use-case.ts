import { Encrypter } from '@/domain/crypto/interfaces'
import { EncrypterType } from '@/domain/crypto/types/encypter-type'
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
