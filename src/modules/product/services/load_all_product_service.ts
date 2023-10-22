import { AppDataSource } from '@config/app_data_source'
import ProductModel from '../models/product'

export class LoadAllProductService {
  async loadAll(): Promise<ProductModel[] | null> {
    const productRepository = AppDataSource.getRepository(ProductModel)
    const products = await productRepository.find()
    return products
  }
}
