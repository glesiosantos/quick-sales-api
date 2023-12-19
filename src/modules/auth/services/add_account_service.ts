import bcrypt from 'bcrypt'
import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'

export type AddAccountModel = {
    name: string
    email: string
    password: string
    isAdmin: boolean
}

export class AddAccountService {
    async add(data: AddAccountModel): Promise<AccountModel> {
        const accountRepository = AppDataSource.getRepository(AccountModel)
        const hash = await bcrypt.hash(data.password, 12)
        const account = accountRepository.create(Object.assign({}, data, { password: hash }))
        const accountDB = await accountRepository.save(account)
        return accountDB
    }
}
