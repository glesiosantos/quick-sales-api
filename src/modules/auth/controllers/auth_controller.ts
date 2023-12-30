import { Request, Response } from 'express'
import { AuthenticationService } from '../services/auth_service'
import { SendForgotAccountTokenService } from '../services/send_forgot_account_token_service'
import { ResetPasswordService } from '../services/reset_password_account_service'

export class AuthController {
  async authentication(request: Request, response: Response): Promise<Response> {
    const authService = new AuthenticationService()
    const token = await authService.authentication(request.body)
    return response.json({ token })
  }

  async forgot(request: Request, response: Response): Promise<Response> {
    const sendAccountTokenService = new SendForgotAccountTokenService()
    await sendAccountTokenService.sendToken(request.body)
    return response.status(204).json()
  }

  async resetPassword(request: Request, response: Response): Promise<Response> {
    const resetPasswordService = new ResetPasswordService()
    await resetPasswordService.reset(request.body)
    return response.status(204).json()
  }
}
