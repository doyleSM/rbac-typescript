import { EncrypterType } from '../types/encypter-type'

export interface Encrypter {
  encrypt: (payload: EncrypterType) => Promise<string>
}
