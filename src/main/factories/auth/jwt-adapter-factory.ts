import { JWT_ADAPTER } from '@/infra/modules/auth/constants'
import { JwtAdapter } from '@/infra/modules/auth/implementation/jwt-adapter'
import { instanceCachingFactory } from 'tsyringe'

const secret = process.env.SECRET ?? 'SECRET'

export const jwtAdapterFactory = {
  token: JWT_ADAPTER,
  useFactory: instanceCachingFactory<JwtAdapter>(() => new JwtAdapter(secret))
}
