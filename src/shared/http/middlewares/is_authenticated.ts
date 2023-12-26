import jwt from 'jsonwebtoken'
import AppError from '@shared/errors/app_error'
import { NextFunction, Request, Response } from 'express'
import authConfig from '@config/auth_config'

export type TokenPayload = {
  sub: string
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('JWT Token is missing')

  const [, token] = authHeader.split(' ')

  try {
    const decode = jwt.verify(token, authConfig.jwt.secret)
    const { sub } = decode

    request.user = {
      id: sub as string
    }
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401)
  }

  next()
}
