import { AppDataSource } from '@config/app_data_source'
import { AccountTokenModel } from '../models/account_token'

export class LoadAccountTokenService {
  async loadTokens(): Promise<AccountTokenModel[]> {
    const tokenRepository = AppDataSource.getRepository(AccountTokenModel)
    return await tokenRepository.find({
      relations: {
        account: true
      },
order: {
        createdAt: 'DESC'
      }
    })
  }
}
