import { Request, Response } from 'express'
import { LoadAccountTokenService } from '../services/load_account_token_service'

export class LoadTokenForgotController {
  async loadTokens(request: Request, response: Response): Promise<Response> {
    const loadTokenServices = new LoadAccountTokenService()
    const tokens = await loadTokenServices.loadTokens()
    return response.json(tokens)
  }
}
