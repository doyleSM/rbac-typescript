import { GenerateTokenUseCase } from '@/application/auth/use-cases/generate-token-use-case'
import { GENERATE_TOKEN_USE_CASE, JWT_ADAPTER } from '@/infra/modules/auth/constants'
import { container, instanceCachingFactory } from 'tsyringe'

export const generateTokenUseCaseFactory = {
  token: GENERATE_TOKEN_USE_CASE,
  useFactory: instanceCachingFactory<GenerateTokenUseCase>(() => new GenerateTokenUseCase(
    container.resolve(JWT_ADAPTER)
  ))
}
