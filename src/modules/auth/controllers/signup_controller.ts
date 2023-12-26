import { Request, Response } from "express";
import { AuthService } from "../services/auth_service";

export class SignUpController {
    async handle(request: Request, response: Response): Promise<Response> {
        const authService = new AuthService()

        const {username, email, password, passwordConfirmation} = request.body

        // if (password !== passwordConfirmation) {
        //     throw new Error('Senha não confere')
        // }

        const account = await authService.add({username, email, password, isAdmin: true, isActive : true})

        return response.json({account}).status(201)
    }
}