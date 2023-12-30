import { Request, Response } from 'express'

export class SignInController {
    async handle(request: Request, response: Response): Promise<Response> {
        return await new Promise(resolve => response.json().status(201))
    }
}
