import { AccountController } from '@modules/auth/controllers/account_controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import isAuthenticated from '../middlewares/is_authenticated'

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
        oldPasswd: Joi.string(),
        newPasswd: Joi.string().optional()
      }
    }),
    accountController.updateDataAccount
  )
  router.get(
    '/accounts',
    isAuthenticated,
    accountController.loadAccount
  )
  router.get(
    '/accounts/profile',
    isAuthenticated,
    accountController.showAccount
  )
}
