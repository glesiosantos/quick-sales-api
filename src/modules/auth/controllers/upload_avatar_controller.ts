import { Request, Response } from 'express'
import { UpdateAvatarAccountService } from '../services/update_avatar_account_service'

export class UploadAvatarController {
  async upload(request: Request, response: Response): Promise<Response> {
    const uploadAvatarService = new UpdateAvatarAccountService()

    await uploadAvatarService.uploadImage({ id: request.user.id, avatar: request.file?.filename })
    return response.json({})
  }
}
