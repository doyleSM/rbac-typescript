import { Create } from '@/domain/shared/repositories/interfaces'

export interface UserRepository<T> extends Create<T> {
  findByMail: (email: string) => Promise<T | null>
}
