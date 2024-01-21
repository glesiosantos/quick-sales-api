import { LoadTokenForgotController } from '@modules/auth/controllers/load_token_forgot_controller'
import { Router } from 'express'
import isAuthenticated from '../middlewares/is_authenticated'

const loadTokenController = new LoadTokenForgotController()

export default (router: Router): void => {
  router.get(
    '/admin/tokens',
    isAuthenticated,
    loadTokenController.loadTokens
  )
}
