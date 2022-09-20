export interface Create<T> {
  create: (item: T) => Promise<T>
}
