import { Request } from 'express'
import path from 'path'
import multer from 'multer'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

export default {
  directory: uploadFolder,
  storage: multer.diskStorage(
    {
      destination: uploadFolder,
      filename(request: Request, file, callback) {
        const filename = `${request.user.id}.${file.originalname.split('.').pop()}`
        callback(null, filename)
      }
    })
}
