import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(`${__dirname}/../shared/http/routers`)
  .map(async file => (await import(`../shared/http/routers/${file}`)).default(router))
}
