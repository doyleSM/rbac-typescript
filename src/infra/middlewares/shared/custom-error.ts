/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ValidationError } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: Request, response: Response, next: NextFunction): Response {
    // if (error instanceof Error) {
    //   return response.status(500).json(error.message)
    // }
    if (error?.errors?.every((error: any) => error instanceof ValidationError)) {
      const parsedError = error?.errors?.map((error: ValidationError) => {
        return this.parseValidationError(error)
      })
      return response.status(error.httpCode).json(parsedError)
    }
    return response.status(error.httpCode ?? 500).json(error)
  }

  parseValidationError (error: ValidationError): any {
    return {
      property: error.property,
      receivedValue: error?.value,
      validations: Object.values(error?.constraints ?? {})
    }
  }
}
