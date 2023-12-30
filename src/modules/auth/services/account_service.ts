import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'
import { LoadAccountByEmailService } from './protocols/load_account_by_email_service'

export class AccountService implements LoadAccountByEmailService {
    async loadByEmail(email: string): Promise<AccountModel | null> {
        const accountRepository = AppDataSource.getRepository(AccountModel)
        const account = await accountRepository.findOneBy({ email })
        return account ?? null
    }
}
