import { Options } from '@mikro-orm/core'
import { BaseEntity, UserEntity } from '../entities'

const pgMikroOrmConfig = {
  type: 'postgresql',
  dbName: 'rbac',
  host: '127.0.0.1',
  user: '6402673de752e427',
  password: '5e13f5f57d9792d3',
  port: process.env.DB_PG_PORT ?? 5433,
  entities: [BaseEntity, UserEntity],
  debug: process.env.TS_NODE_DEV !== undefined,
  migrations: {
    path: 'dist/src/infra/modules/databases/postgres/mikro-orm/migrations',
    pathTs: 'src/infra/modules/databases/postgres/mikro-orm/migrations'
  }
}

export default pgMikroOrmConfig as Options
