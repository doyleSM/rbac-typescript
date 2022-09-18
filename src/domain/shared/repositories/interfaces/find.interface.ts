export interface Find<T> {
  find: (item: T) => Promise<T[]>
}
