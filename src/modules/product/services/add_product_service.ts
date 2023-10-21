import { AppDataSource } from '@config/app_data_source'
import Product from '../models/product'

type ProductModel = {
  name: string
  description: string
  quantity: number
  price: number
}

export class AddProductService {
  async add(productModel: ProductModel): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product)
    const product = productRepository.create(productModel)
    const result = await productRepository.save(product)
    return result
  }
}
