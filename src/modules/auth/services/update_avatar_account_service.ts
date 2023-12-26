import path from 'path'
import fs from 'fs'
import { AppDataSource } from '@config/app_data_source'
import AppError from '@shared/errors/app_error'
import uploadConfig from '@config/multer_config'
import { AccountModel } from '@modules/auth/models/account'

type AvatarAccountModel = {
  id: string
  avatar: string
}

export class UpdateAvatarAccountService {
  async uploadImage(data: AvatarAccountModel): Promise<void> {
    const accountRepository = AppDataSource.getRepository(AccountModel)
    const account: any = accountRepository.findOneBy({ id: data.id })

    if (!account) throw new AppError('Account not found')

    if (account.avatar) {
      const avatarAccount = path.join(uploadConfig.directory, account.avatar)
      const avatarAccountExists = await fs.promises.stat(avatarAccount)

      if (avatarAccountExists) {
        await fs.promises.unlink(avatarAccount) // apagar o arquivo
      }
    }

    account.avatar = data.id
  }
}
