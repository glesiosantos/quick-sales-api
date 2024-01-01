import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'
import AppError from '@shared/errors/app_error'

export class ShowAccountProfileService {
  async show(id: string): Promise<AccountModel | null> {
    const accountRepository = AppDataSource.getRepository(AccountModel)
    const account = await accountRepository.findOneBy({ id })
    if (!account) throw new AppError('Account not found!')
    return account
  }
}
