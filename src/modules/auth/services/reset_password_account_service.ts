import bcrypt from 'bcrypt'
import AppError from '@shared/errors/app_error'
import { AppDataSource } from '@config/app_data_source'
import { AccountTokenModel } from '../models/account_token'
import { AccountModel } from '../models/account'
import { addHours, isAfter } from 'date-fns'

export type AccountTokenVerifyModel = {
    email: string
    token: string
    accountId: string
    password: string
}

export class ResetPasswordService {
    async reset(data: AccountTokenVerifyModel): Promise<void> {
        const tokenRepository = AppDataSource.getRepository(AccountTokenModel)
        const accountRepository = AppDataSource.getRepository(AccountModel)

        // Validar token de acesso

        const existsToken = await tokenRepository.findOneBy({ token: data.token })

        if (!existsToken) throw new AppError('Token not found')

        // Verificar se existe usuário

        const account = await accountRepository.findOneBy({ id: data.accountId })

        if (!account) throw new AppError('Account not found')

        const tokenCreatedAtValid = addHours(existsToken.createdAt, 2)

        if (isAfter(Date.now(), tokenCreatedAtValid)) throw new AppError('Expired token')
        const hash = await bcrypt.hash(data.password, 12)

        await accountRepository.createQueryBuilder()
          .update(AccountModel)
          .set({
            password: hash,
            updatedAt: Date.now()
          }).where({ id: account.id }).execute()
    }
}
