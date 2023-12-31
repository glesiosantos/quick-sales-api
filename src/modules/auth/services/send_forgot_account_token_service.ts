import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'
import { AccountTokenModel } from '../models/account_token'
import AppError from '@shared/errors/app_error'
import { SendEmailService } from '@modules/email/services/send_email_service'

export type TokenModel = {
    email: string
    accountId: string
}

export class SendForgotAccountTokenService {
    async sendToken(data: TokenModel): Promise<void> {
        const accountRepository = AppDataSource.getRepository(AccountModel)
        const tokenRepository = AppDataSource.getRepository(AccountTokenModel)
        const sendMailService = new SendEmailService()

        const account = await accountRepository.findOneBy({ email: data.email })

        if (!account) {
          throw new AppError('Account not found')
        }

        const accountToken = tokenRepository.create({ account })
        const result = await tokenRepository.save(accountToken)
        const accountTokenActive = await tokenRepository.findOneBy({ id: result.id }) // recuperar token

      await sendMailService.sendMailTest({
        to: { name: account.name, email: account.email },
        subject: '[Quick Sales] Recuperação de senha',
        templateData: {
          templateHtml: `Solicitação de redefinição de senha recebida /api/auth/reset/${accountTokenActive?.token}`,
          variables:
            [{
              name: account.name,
              token: accountTokenActive?.token as string
            }]
        }
      })
    }
}
