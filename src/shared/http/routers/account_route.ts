import { AccountController } from '@modules/auth/controllers/account_controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const accountController = new AccountController()

export default (router: Router): void => {
  router.post(
    '/auth/signup',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        idAdmin: Joi.boolean().default(false)
      }
    }),
    accountController.addAccount
  )
  router.post(
    '/accounts/update',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    }),
    accountController.addAccount
  )
  router.get(
    '/accounts/profile/:id',
    accountController.addAccount
  )
}
