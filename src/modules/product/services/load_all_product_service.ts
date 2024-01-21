import { AppDataSource } from '@config/app_data_source'
import ProductModel from '../models/product'
import RedisCache from '@shared/cache/redis_cache'

export class LoadAllProductService {
  async loadAll(): Promise<ProductModel[] | null> {
    const productRepository = AppDataSource.getRepository(ProductModel)

    const redisCacheProduct = new RedisCache()
    let products = await redisCacheProduct.recoverCache<ProductModel[]>('API_QS_PRODUCTS')

    if (!products) {
      products = await productRepository.find({})
      await redisCacheProduct.saveCache('API_QS_PRODUCTS', products)
    }

    return products
  }
}
