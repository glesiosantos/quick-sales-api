import AccountModel from "../../models/account";

export type AddAccountModel = {
    username: string
    email: string
    password: string
    isActive: boolean
    isAdmin: boolean
}

export interface AddAccountService {
    add(addAccountModel: AddAccountModel): Promise<AccountModel>
}