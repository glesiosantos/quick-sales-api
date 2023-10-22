import { Request, Response } from "express";

export class SignInController {
    handle(request: Request, response: Response): Promise<Response> {
        return new Promise(resolve => response.json().status(201))
    }
}