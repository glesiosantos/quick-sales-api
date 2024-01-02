import path from 'path'
import fs from 'fs'
import { AppDataSource } from '@config/app_data_source'
import AppError from '@shared/errors/app_error'
import uploadConfig from '@config/multer_config'
import { AccountModel } from '@modules/auth/models/account'

type AvatarAccountModel = {
  id: string
  avatar?: string
}

export class UpdateAvatarAccountService {
  async uploadImage(data: AvatarAccountModel): Promise<void> {
    const accountRepository = AppDataSource.getRepository(AccountModel)
    const account: any = await accountRepository.findOneBy({ id: data.id })
    console.log('email: ' + account.email)
    console.log('file: ' + data.avatar)

    if (!account) throw new AppError('Account not found')

    if (account.avatar && account.avatar === 'avatar.default') {
      const avatarAccount = path.join(uploadConfig.directory, account.avatar)
      const avatarAccountExists = await fs.promises.stat(avatarAccount)

      if (avatarAccountExists) {
        console.log('avatar', account.avatar)
        await fs.promises.unlink(avatarAccount) // apagar o arquivo
      }

      console.log('arquivo ', data.avatar)
      await accountRepository
        .createQueryBuilder()
        .update(AccountModel)
        .set({
          avatar: data.avatar
          // updatedAt: new Date()
        }).where({ id: account.id }).execute()
    }
  }
}
