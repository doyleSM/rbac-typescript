import { CustomErrorHandler } from '@/infra/middlewares'
import { UsersController } from '@/infra/modules/users/users.controllers'
import express, { Express } from 'express'
import { useExpressServer } from 'routing-controllers'
import { setupContainer } from './setup-container'

export const setupApp = async (): Promise<Express> => {
  const app = express()

  await setupContainer()

  useExpressServer(app, {
    routePrefix: 'api',
    controllers: [UsersController],
    defaultErrorHandler: false,
    middlewares: [CustomErrorHandler]
  })

  return app
}
