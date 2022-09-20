import { JWT_ADAPTER } from '@/infra/modules/auth/constants'
import { JwtAdapter } from '@/infra/modules/auth/implementation/jwt-adapter'

const secret = process.env.SECRET ?? 'SECRET'

export const jwtAdapterFactory = {
  token: JWT_ADAPTER,
  useFactory: () => new JwtAdapter(secret)
}
