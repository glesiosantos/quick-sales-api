import { Request, Response } from 'express'
import { AddProductService } from '../services/add_product_service'
import { LoadAllProductService } from '../services/load_all_product_service'
import { LoadProductByIdService } from '../services/load_product_by_id_service'

export class ProductController {
  async addProduct(request: Request, response: Response): Promise<Response> {
    const addProductService = new AddProductService()
    const product = await addProductService.add(request.body)
    return response.json({ product }).status(201)
  }

  async loadProducts(request: Request, response: Response): Promise<Response> {
    const loadProductService = new LoadAllProductService()
    const products = await loadProductService.loadAll()
    return response.json({ products }).status(200)
  }

  async loadProductById(request: Request, response: Response): Promise<Response> {
    const loadProductByIdService = new LoadProductByIdService()
    const products = await loadProductByIdService.loadById(request.params.id)
    return response.json({ products }).status(200)
  }
}
