import { ProductController } from '@modules/product/controllers/product_controller'
import { Router } from 'express'

const productController = new ProductController()

export default (router: Router): void => {
  router.post('/products', productController.addProduct)
  router.get('/products', productController.loadProducts)
  router.get('/products/:id', productController.loadProductById)
}
