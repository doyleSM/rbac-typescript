import { EncrypterType } from '../types/encypter-type'

export interface Decrypter {
  decrypt: (ciphertext: string) => Promise<EncrypterType>
}
