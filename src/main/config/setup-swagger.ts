import { Express } from 'express'
import {
  getMetadataArgsStorage
} from 'routing-controllers'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUiExpress from 'swagger-ui-express'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require('class-transformer/cjs/storage')
export const setupSwagger = async (app: Express, routingControllersOptions: any): Promise<Express> => {
  // Parse class-validator classes into JSON Schema:
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/'
  })

  // Parse routing-controllers classes into OpenAPI spec:
  const storage = getMetadataArgsStorage()
  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
      schemas,
      securitySchemes: {
        basicAuth: {
          scheme: 'basic',
          type: 'http'
        }
      }
    },
    info: {
      description: 'Generated with `routing-controllers-openapi`',
      title: 'A sample API',
      version: '1.0.0'
    }
  })

  app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))

  // Render spec on root:
  app.get('/', (_req, res) => {
    res.json(spec)
  })

  return app
}
