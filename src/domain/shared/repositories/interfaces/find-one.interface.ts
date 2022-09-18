export interface FindOne<T> {
  findOne: (id: string) => Promise<T>
}
