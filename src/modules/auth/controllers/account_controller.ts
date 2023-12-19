import { Request, Response } from 'express'
import { AddAccountService } from '../services/add_account_service'

export class AccountController {
    async addAccount(request: Request, response: Response): Promise<Response> {
      const accountService = new AddAccountService()
      await accountService.add(request.body)
      return response.status(201).end()
    }
}
