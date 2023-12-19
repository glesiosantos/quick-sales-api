import bcrypt from 'bcrypt'
import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'
import AppError from '@shared/errors/app_error'

type AccountAuthenticationModel = {
  email: string
  password: string
}

export class AuthenticationService {
  async authentication(data: AccountAuthenticationModel): Promise<AccountModel> {
    const accountRepository = AppDataSource.getRepository(AccountModel)
    const account = await accountRepository.findOneBy({ email: data.email })

    if (!account) throw new AppError('Incorrect email/password', 401)

    const comparedHash = await bcrypt.compare(data.password, account.password)

    if (!comparedHash) throw new AppError('Incorrect email/password', 401)
    return account
  }
}
