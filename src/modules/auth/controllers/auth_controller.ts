import { Request, Response } from 'express'
import { AuthenticationService } from '../services/auth_service'

export class AuthController {
  async authentication(request: Request, response: Response): Promise<Response> {
    const authService = new AuthenticationService()
    const token = await authService.authentication(request.body)
    return response.json({ token })
  }
}