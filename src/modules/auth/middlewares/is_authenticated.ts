import AppError from '@shared/errors/app_error'
import { NextFunction, Request, Response } from 'express'

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('JWT Token is missing')

  next()
}
