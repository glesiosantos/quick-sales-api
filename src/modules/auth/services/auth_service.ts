import { AppDataSource } from "@config/app_data_source";
import AccountModel from "../models/account";
import { AddAccountModel, AddAccountService } from "./protocols/add_account_service";

export class AuthService implements AddAccountService {
    async add(addAccountModel: AddAccountModel): Promise<AccountModel> {
        const accountRepository = AppDataSource.getRepository(AccountModel)
        const account = accountRepository.create(addAccountModel)
        return await accountRepository.save(account)
    }
}