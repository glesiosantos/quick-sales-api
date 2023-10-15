import { Router } from 'express'

const route = Router()

route.get('/', (request, response) => response.json({ message: 'Ola' }))

export default route
