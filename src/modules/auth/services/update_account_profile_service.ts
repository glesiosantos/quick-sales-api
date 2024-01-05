import bcrypt from 'bcrypt'
import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'
import AppError from '@shared/errors/app_error'

type UpdateAccountModel = {
  id: string
  name: string
  email: string
  oldPasswd?: string
  newPasswd?: string
}

export class UpdateAccountProfileService {
  async update(data: UpdateAccountModel): Promise<void> {
    const accountRepository = AppDataSource.getRepository(AccountModel)
    const account = await accountRepository.findOneBy({ id: data.id })

    if (!account) throw new AppError('Account not found!')

    if (!data.oldPasswd && data.newPasswd) throw new AppError('Old password is required.')

    if (data.newPasswd && data.oldPasswd) { // caso tenha senha antiga e nova
      const checkedOldPasswd = bcrypt.compare(data.oldPasswd, account.password)

      if (!checkedOldPasswd) throw new AppError('Old password not matcher.')

      const hashPasswd = await bcrypt.hash(data.newPasswd, 12)

      await accountRepository.createQueryBuilder().update(AccountModel)
      .where({ id: data.id })
      .set({
        name: data.name,
        password: hashPasswd
      })
      .execute()
    } else {
      await accountRepository.createQueryBuilder().update(AccountModel)
    .where({ id: data.id })
    .set({
      name: data.name
    })
    .execute()
    }
  }
}
