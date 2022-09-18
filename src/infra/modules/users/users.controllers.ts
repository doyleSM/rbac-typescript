import { CreateUserUseCase } from '@/application/users/use-cases/create-user-use-case'
import { Body, JsonController, Post } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'
import { inject, injectable } from 'tsyringe'
import { CREATE_USER_USE_CASE } from './constants'
import { CreateUserDto } from './dto'

@OpenAPI({
  security: [{ basicAuth: [] }]
})
@JsonController('/users')
@injectable()
export class UsersController {
  constructor (@inject(CREATE_USER_USE_CASE) private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  create (@Body() user: CreateUserDto): any {
    return this.createUserUseCase.execute(user)
  }
}
