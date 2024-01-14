import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { CustomerController } from '@modules/customer/controllers/customer_controller'

const customerController = new CustomerController()

export default (router: Router): void => {
  router.post(
    '/customers/add',
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
    customerController.loadCustomer
  )
  router.get(
    '/customers/:phone',
    customerController.loadCustomerByPhone
  )
  router.get(
    '/customers/order',
    customerController.loadCustomerByPhone
  )
}
