
import { Decrypter, Encrypter } from '@/domain/auth/interfaces'
import { EncrypterType } from '@/domain/auth/types/encypter-type'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (payload: EncrypterType): Promise<string> {
    return jwt.sign(payload, this.secret)
  }

  async decrypt (ciphertext: string): Promise<EncrypterType> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
