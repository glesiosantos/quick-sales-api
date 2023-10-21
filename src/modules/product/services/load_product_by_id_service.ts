import { AppDataSource } from '@config/app_data_source'
import Product from '../models/product'

export class LoadProductByIdService {
  async loadById(id: string): Promise<Product | null> {
    const productRepository = AppDataSource.getRepository(Product)
    const product = await productRepository.findOneBy({ id })
    return product
  }
}
