import { Request, Response } from 'express'
import { AddProductService } from '../services/add_product_service'

export class ProductController {
  async addProduct(request: Request, response: Response): Promise<Response> {
    const addProductService = new AddProductService()
    const product = await addProductService.add(request.body)
    return response.json({ product }).status(201)
  }
}
