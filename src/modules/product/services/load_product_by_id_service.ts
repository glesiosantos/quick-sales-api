import { AppDataSource } from '@config/app_data_source'
import ProductModel from '../models/product'

export class LoadProductByIdService {
  async loadById(id: string): Promise<ProductModel | null> {
    const productRepository = AppDataSource.getRepository(ProductModel)
    const product = await productRepository.findOneBy({ id })
    return product
  }
}
