import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'
import AppError from '@shared/errors/app_error'

type AccountAuthenticationModel = {
  email: string
  password: string
}

export class AuthenticationService {
  async authentication(data: AccountAuthenticationModel): Promise<string> {
    const accountRepository = AppDataSource.getRepository(AccountModel)
    const account = await accountRepository.findOneBy({ email: data.email })

    if (!account) throw new AppError('Incorrect email/password', 401)

    const comparedHash = await bcrypt.compare(data.password, account.password)

    if (!comparedHash) throw new AppError('Incorrect email/password', 401)

    const accessToken = jwt.sign({}, 'accoe56d80c09aef1a6e098ea37fc7e63e79ec63c86a0d6b30069f8fe94f71291023unt', { subject: account.id, expiresIn: '1d' })
    return accessToken
  }
}
