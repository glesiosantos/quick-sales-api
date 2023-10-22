import { celebrate, Joi, Segments} from 'celebrate'
import { ProductController } from '@modules/product/controllers/product_controller'
import { Router } from 'express'
import { SignUpController } from '@modules/auth/controllers/signup_controller'
import { SignInController } from '@modules/auth/controllers/signin_controller'

const signUpController = new SignUpController() 
const signinController = new SignInController()

export default (router: Router): void => {
  router.post(
    '/signin',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    }),
    signinController.handle
  )
  router.post(
    '/signup',
    celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        passwordConfirmation: Joi.string().required()
      }
    }),
    signUpController.handle
  )

}
