import { AppDataSource } from "@config/app_data_source";
import AccountModel from "../models/account";
import { AddAccountModel, AddAccountService } from "./protocols/add_account_service";
import { LoadAccountByEmailService } from "./protocols/load_account_by_email_service";

export class AccountService implements AddAccountService, LoadAccountByEmailService {
    
    async add(addAccountModel: AddAccountModel): Promise<AccountModel> {
        const accountRepository = AppDataSource.getRepository(AccountModel)
        const account = accountRepository.create(addAccountModel)
        return await accountRepository.save(account)
    }

    async loadByEmail(email: string): Promise<AccountModel | null> {
        const accountRepository = AppDataSource.getRepository(AccountModel)
        const account = await accountRepository.findOneBy({email})
        return account ?? null
    }
}