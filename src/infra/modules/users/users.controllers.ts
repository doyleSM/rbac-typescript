import { AuthenticateUserUseCase } from '@/application/auth/use-cases/authenticate-user-use-case'
import { CreateUserUseCase } from '@/application/users/use-cases/create-user-use-case'
import { User } from '@/domain/users/entities/user'
import { AuthMiddleware } from '@/infra/middlewares/auth/auth-middleware'
import { Body, Get, HeaderParam, JsonController, Post, UseBefore } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'
import { inject, injectable } from 'tsyringe'
import { AUTHENTICATE_USER_USE_CASE, CREATE_USER_USE_CASE } from './constants'
import { CreateUserDto } from './dto'
import { AuthenticateUserDto } from './dto/authenticate-user.dto'

@OpenAPI({
  security: [{ basicAuth: [] }]
})
@JsonController('/users')
@injectable()
export class UsersController {
  constructor (@inject(CREATE_USER_USE_CASE) private readonly createUserUseCase: CreateUserUseCase,
    @inject(AUTHENTICATE_USER_USE_CASE) private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post('/')
  create (@Body() user: CreateUserDto): any {
    return this.createUserUseCase.execute(user)
  }

  @UseBefore(AuthMiddleware)
  @Get('/teste')
  teste (@HeaderParam('user') user: User): User {
    return user
  }

  @Post('/login')
  login (@Body() payload: AuthenticateUserDto): any {
    return this.authenticateUserUseCase.execute(payload)
  }
}
