import { OrderController } from '@modules/order/controllers/order_controller'
import { Router } from 'express'

const orderController = new OrderController()

export default (router: Router): void => {
  router.post(
    '/orders',
    orderController.saveOrder
  )
}
