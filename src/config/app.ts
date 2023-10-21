import 'express-async-errors'
import 'reflect-metadata'
import { errors } from 'celebrate'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

import AppError from '@shared/errors/app_error'
import routeSetup from './routes'
import route from '@shared/http/routers'

const app = express()
app.use(cors())
app.use(express.json())
routeSetup(app)

app.use(errors()) // para capturar os error na requisição

// Middleware para capturar de error de execução
app.use(route)

// Middleware para captura de error
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }

  return response.status(500).json({ status: 'error', message: 'Internal Server Error' })
})

export default app
