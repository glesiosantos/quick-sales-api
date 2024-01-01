import { AppDataSource } from '@config/app_data_source'
import { AccountModel } from '../models/account'
import AppError from '@shared/errors/app_error'

type UpdateAccountModel = {
  id: string
  name: string
  email: string
  oldPasswd: string
  newPasswd: string
}

export class UpdateAccountProfileService {
  async update(data: UpdateAccountModel): Promise<void> {
    const accountRepository = AppDataSource.getRepository(AccountModel)
    const account = await accountRepository.findOneBy({ id: data.id })
    if (!account) throw new AppError('Account not found!')
    await accountRepository.createQueryBuilder().update(AccountModel)
    .where({ id: data.id })
    .set({
      name: data.name,
      email: data.email,
      password: !data.newPasswd ? data.oldPasswd : data.newPasswd
    })
    .execute()
  }
}
