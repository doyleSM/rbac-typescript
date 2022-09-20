import { BCRYPT_ADAPTER } from '@/infra/modules/auth/constants'
import { BcryptAdapter } from '@/infra/modules/auth/implementation/bcrypt-adapter'

const salts = 12
export const bcryptAdapterFactory = {
  token: BCRYPT_ADAPTER,
  useFactory: () => new BcryptAdapter(salts)
}
