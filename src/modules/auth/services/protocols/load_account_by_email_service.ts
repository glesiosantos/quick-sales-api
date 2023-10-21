import AccountModel from "@modules/auth/models/account";

export interface LoadAccountByEmailService {
    loadByEmail(email: string): Promise<AccountModel | null>
}