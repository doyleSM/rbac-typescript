import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { MikroORM } from '@mikro-orm/core'
import { singleton } from 'tsyringe'
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql'
import { CloseConnectionDatabase, ConnectDatabase, GetEntityManager } from '../../../interfaces'
import pgMikroOrmConfig from './mikro-orm-pg-options'

@singleton()
export default class PgMikroOrmDatabaseProvider implements CloseConnectionDatabase, ConnectDatabase, GetEntityManager {
  private connection!: MikroORM<PostgreSqlDriver>

  public async connect (): Promise<void> {
    this.connection = await MikroORM.init<PostgreSqlDriver>(
      Object.assign({ metadataProvider: TsMorphMetadataProvider }, ...[pgMikroOrmConfig])
    )
  }

  public async close (): Promise<void> {
    if (this.connection !== undefined) {
      await this.connection.close()
    }
  }

  public getEntityManager = (): EntityManager<PostgreSqlDriver> => {
    return this.connection.em.fork()
  }
}
