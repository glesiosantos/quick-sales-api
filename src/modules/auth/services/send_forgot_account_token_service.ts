import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'
import { AccountTokenModel } from '../models/account_token'
import AppError from '@shared/errors/app_error'

export type TokenModel = {
    email: string
    accountId: string
}

export class SendForgotAccountTokenService {
    async sendToken(data: TokenModel): Promise<void> {
        const accountRepository = AppDataSource.getRepository(AccountModel)
        const tokenRepository = AppDataSource.getRepository(AccountTokenModel)
        const account = await accountRepository.findOneBy({ email: data.email })

        if (!account) {
          throw new AppError('Account not found')
        }

        const accountToken = tokenRepository.create({ account })
        await tokenRepository.save(accountToken)
    }
}
