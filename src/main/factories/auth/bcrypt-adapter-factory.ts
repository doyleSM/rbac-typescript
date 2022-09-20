import { BCRYPT_ADAPTER } from '@/infra/modules/auth/constants'
import { BcryptAdapter } from '@/infra/modules/auth/implementation/bcrypt-adapter'
import { instanceCachingFactory } from 'tsyringe'

const salts = 12
export const bcryptAdapterFactory = {
  token: BCRYPT_ADAPTER,
  useFactory: instanceCachingFactory<BcryptAdapter>(() => new BcryptAdapter(salts))
}
