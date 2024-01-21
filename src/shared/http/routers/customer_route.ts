import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { CustomerController } from '@modules/customer/controllers/customer_controller'
import isAuthenticated from '../middlewares/is_authenticated'

const customerController = new CustomerController()

export default (router: Router): void => {
  router.post(
    '/customers/add',
    isAuthenticated,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        phone: Joi.string().required().length(11)
      }
    }),
    customerController.addCustomer
  )
  router.get(
    '/customers',
    isAuthenticated,
    customerController.loadCustomer
  )
  router.get(
    '/customers/:phone',
    isAuthenticated,
    customerController.loadCustomerByPhone
  )
  router.get(
    '/customers/order',
    isAuthenticated,
    customerController.loadCustomerByPhone
  )
}
