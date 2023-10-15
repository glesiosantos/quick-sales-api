import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

import AppError from '@shared/errors/app_error'
import routeSetup from './routes'

const app = express()
app.use(cors())
app.use(express.json())
routeSetup(app)

// Middleware para captura de error
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }

  return response.status(500).json({ status: 'error', message: 'Internal Server Error' })
})

export default app
