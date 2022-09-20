import { Create, Delete, Find, FindOne, Update } from '../interfaces'

export abstract class BaseRepository<T> implements Create<T>, Delete, Find<T>, FindOne<T>, Update<T> {
  async create (item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }

  async delete (id: string): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }

  async find (item: T): Promise<T[]> {
    throw new Error('Method not implemented.')
  }

  async findOne (id: string): Promise<T> {
    throw new Error('Method not implemented.')
  }

  async update (id: string, item: T): Promise<Boolean | T> {
    throw new Error('Method not implemented.')
  }
}
