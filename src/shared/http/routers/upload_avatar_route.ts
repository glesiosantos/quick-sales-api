import { UploadAvatarController } from '@modules/auth/controllers/upload_avatar_controller'
import { Router } from 'express'
import isAuthenticated from '../middlewares/is_authenticated'
import multer from 'multer'
import multerConfig from '@config/multer_config'

const uploadAvatarController = new UploadAvatarController()

const upload = multer(multerConfig)

export default (router: Router): void => {
  router.patch(
    '/accounts/avatar/upload',
    isAuthenticated,
    upload.single('avatar'),
    uploadAvatarController.upload
  )
}
