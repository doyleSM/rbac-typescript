import { Options } from '@mikro-orm/core'
// import { BaseEntity, UserEntity } from '../entities'

const pgMikroOrmConfig = {
  type: 'postgresql',
  dbName: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT ?? 5432,
  // entities: [BaseEntity, UserEntity],
  entities: ['dist/infra/modules/databases/postgres/mikro-orm/entities'],
  entitiesTs: ['src/infra/modules/databases/postgres/mikro-orm/entities'],
  debug: process.env.TS_NODE_DEV !== undefined,
  migrations: {
    path: 'dist/infra/modules/databases/postgres/mikro-orm/migrations',
    pathTs: 'src/infra/modules/databases/postgres/mikro-orm/migrations'
  }
}

export default pgMikroOrmConfig as Options
