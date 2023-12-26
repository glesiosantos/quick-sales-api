import { celebrate, Joi, Segments } from 'celebrate'
import { ProductController } from '@modules/product/controllers/product_controller'
import { Router } from 'express'
import isAuthenticated from '@shared/http/middlewares/is_authenticated'

const productController = new ProductController()

export default (router: Router): void => {
  router.post(
    '/products',
    isAuthenticated,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string(),
        quantity: Joi.number().required(),
        price: Joi.number().precision(2).required()
      }
    }),
    productController.addProduct
  )
  router.get('/products', isAuthenticated, productController.loadProducts)
  router.get(
    '/products/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().required()
      }
    }),
    productController.loadProductById)
}
