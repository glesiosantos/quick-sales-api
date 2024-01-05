import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'

export class LoadAccountService {
  async load(): Promise<AccountModel[] | null> {
    const accountRepository = AppDataSource.getRepository(AccountModel)
    const account = await accountRepository.find({})
    return account
  }
}
