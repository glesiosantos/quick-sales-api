import { AppDataSource } from '@config/app_data_source'
import ProductModel from '../models/product'
import RedisCache from '@shared/cache/redis_cache'

type AddProductModel = {
  name: string
  description: string
  quantity: number
  price: number
}

export class AddProductService {
  async add(addProductModel: AddProductModel): Promise<ProductModel> {
    const productRepository = AppDataSource.getRepository(ProductModel)
    const redisCacheProduct = new RedisCache()

    await redisCacheProduct.removeCache('API_QS_PRODUCTS')
    const product = productRepository.create(addProductModel)
    const result = await productRepository.save(product)
    return result
  }
}
