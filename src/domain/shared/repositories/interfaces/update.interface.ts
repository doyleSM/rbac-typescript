export interface Update<T> {
  update: (id: string, item: T) => Promise<T | Boolean>
}
