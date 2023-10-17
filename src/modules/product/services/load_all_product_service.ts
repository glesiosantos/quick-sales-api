import { AppDataSource } from '@config/app_data_source'
import Product from '../models/product'

export class LoadAllProductService {
  async loadAll(): Promise<Product[] | null> {
    const productRepository = AppDataSource.getRepository(Product)
    const products = await productRepository.find()
    return products
  }
}
