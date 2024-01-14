import { Router } from 'express'
import { OrderController } from '@modules/order/controllers/order_controller'
import isAuthenticated from '../middlewares/is_authenticated'

const orderController = new OrderController()

export default (router: Router): void => {
  router.post(
    '/orders',
    isAuthenticated,
    orderController.saveOrder
  )
  router.delete(
    '/orders/:id',
    isAuthenticated,
    orderController.deleteOrders
  )
  router.put(
    '/orders/to/:id',
    isAuthenticated,
    orderController.convertBudgetToOrder
  )
  router.get(
    '/orders',
    isAuthenticated,
    orderController.loadAllOrders
  )
  router.post(
    '/orders/customer',
    isAuthenticated,
    orderController.loadOrderByCustomer
  )
}
