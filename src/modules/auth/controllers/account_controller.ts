import { Request, Response } from 'express'

export class AccountController {
    async addAccount(request: Request, response: Response): Promise<Response> {
        return response.status(201).end()
    }
}
