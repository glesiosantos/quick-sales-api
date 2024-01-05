import { Request, Response } from 'express'
import { AddAccountService } from '../services/add_account_service'
import { UpdateAccountProfileService } from '../services/update_account_profile_service'
import { LoadAccountService } from '../services/load_all_accounts_service'
import { ShowAccountProfileService } from '../services/show_account_profile_service'

export class AccountController {
  async addAccount(request: Request, response: Response): Promise<Response> {
    const accountService = new AddAccountService()
    await accountService.add(request.body)
    return response.status(201).end()
  }

  async loadAccount(request: Request, response: Response): Promise<Response> {
    const loadAccountService = new LoadAccountService()
    const data = await loadAccountService.load()
    return response.json({ data })
  }

  async showAccount(request: Request, response: Response): Promise<Response> {
    const showAccountService = new ShowAccountProfileService()
    const data = await showAccountService.show(request.user.id)
    return response.json({ data })
  }

  async updateDataAccount(request: Request, response: Response): Promise<Response> {
    const updatedAccountService = new UpdateAccountProfileService()
    await updatedAccountService.update(request.body)
    return response.status(204).end()
  }
}
