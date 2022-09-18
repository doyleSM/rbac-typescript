import { CustomErrorHandler } from '@/infra/middlewares'
import { UsersController } from '@/infra/modules/users/users.controllers'
import express, { Express } from 'express'
import { useExpressServer } from 'routing-controllers'
import { setupContainer } from './setup-container'
import { setupSwagger } from './setup-swagger'

export const setupApp = async (): Promise<Express> => {
  let app = express()

  await setupContainer()
  const routingControllersOptions = {
    routePrefix: '/api',
    controllers: [UsersController],
    defaultErrorHandler: false,
    middlewares: [CustomErrorHandler]
  }

  useExpressServer(app, routingControllersOptions)
  app = await setupSwagger(app, routingControllersOptions)

  return app
}
