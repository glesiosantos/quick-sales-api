import { AppDataSource } from '@config/app_data_source'
import ProductModel from '../models/product'

type AddProductModel = {
  name: string
  description: string
  quantity: number
  price: number
}

export class AddProductService {
  async add(addProductModel: AddProductModel): Promise<ProductModel> {
    const productRepository = AppDataSource.getRepository(ProductModel)
    const product = productRepository.create(addProductModel)
    const result = await productRepository.save(product)
    return result
  }
}
