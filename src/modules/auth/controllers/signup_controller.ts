import { Request, Response } from 'express'
import { AddAccountService } from '../services/add_account_service'

export class SignUpController {
    async handle(request: Request, response: Response): Promise<Response> {
        const authService = new AddAccountService()
        await authService.add(request.body)
        return response.status(201).json()
    }
}
