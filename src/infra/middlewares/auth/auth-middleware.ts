
import { FindUserByTokenUseCase } from '@/application/auth/use-cases/find-user-by-token-use-case'
import { FIND_USER_BY_TOKEN_USE_CASE } from '@/infra/modules/auth/constants'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { inject, injectable } from 'tsyringe'

@Middleware({ type: 'after' })
@injectable()
export class AuthMiddleware implements ExpressMiddlewareInterface {
  constructor (
    @inject(FIND_USER_BY_TOKEN_USE_CASE)
    private readonly findUserByTokenUseCase: FindUserByTokenUseCase
  ) {}

  async use (request: any, response: any, next: (err?: any) => any): Promise<any> {
    const { authorization } = request.headers
    const token = authorization.split('Bearer ')[1]
    const user = await this.findUserByTokenUseCase.execute({ token })
    request.headers.user = user
    next()
  }
}
