
import { Decrypter, Encrypter } from '@/domain/crypto/interfaces'
import { EncrypterType } from '@/domain/crypto/types/encypter-type'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (payload: EncrypterType): Promise<string> {
    return jwt.sign(payload, this.secret)
  }

  async decrypt (ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
