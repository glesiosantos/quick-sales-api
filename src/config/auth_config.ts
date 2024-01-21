import env from './env'

export default {
  jwt: {
    secret: env.jwtSecret,
    expiresIn: env.expiresInJwt
  }
}
