import { Request, Response } from 'express'

export class ProductController {
  async addProduct(request: Request, response: Response): Promise<Response> {
    return response.json({}).status(201)
  }
}
