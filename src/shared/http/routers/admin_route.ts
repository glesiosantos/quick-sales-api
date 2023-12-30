import { LoadTokenForgotController } from '@modules/auth/controllers/load_token_forgot_controller'
import { Router } from 'express'

const loadTokenController = new LoadTokenForgotController()

export default (router: Router): void => {
  router.get(
    '/admin/tokens',
    loadTokenController.loadTokens
  )
}
