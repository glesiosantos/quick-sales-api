import { AuthController } from '@modules/auth/controllers/auth_controller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const authController = new AuthController()

export default (router: Router): void => {
  router.post(
    '/auth/signin',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    }),
    authController.authentication
  )
}
