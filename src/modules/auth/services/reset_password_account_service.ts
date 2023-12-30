import bcrypt from 'bcrypt'
import AppError from '@shared/errors/app_error'
import { AppDataSource } from '@config/app_data_source'
import { AccountTokenModel } from '../models/account_token'
import { AccountModel } from '../models/account'
import { addHours, isAfter } from 'date-fns'

export type AccountTokenVerifyModel = {
    token: string
    password: string
}

export class ResetPasswordService {
    async reset(data: AccountTokenVerifyModel): Promise<void> {
        const tokenRepository = AppDataSource.getRepository(AccountTokenModel)
        const accountRepository = AppDataSource.getRepository(AccountModel)

        // Validar token de acesso

        const accountToken = await tokenRepository.find({ where: { token: data.token }, relations: { account: true } })

        if (!accountToken) throw new AppError('Token not found')

        // Verificar se existe usuário

        const account = await accountRepository.findOneBy({ id: accountToken[0].account.id })

        if (!account) throw new AppError('Account not found')

        const tokenCreatedAtValid = addHours(accountToken[0].createdAt, 2)
        console.log(tokenCreatedAtValid)

        if (isAfter(Date.now(), tokenCreatedAtValid.toISOString())) throw new AppError('Expired token')
        const hash = await bcrypt.hash(data.password, 12)

        await accountRepository.createQueryBuilder()
          .update(AccountModel)
          .set({
            password: hash
          }).where({ id: account.id }).execute()
    }
}
