import type { RouterInstance } from '../types/core.types.js'

import { serveStatic } from '@hono/node-server/serve-static'
import { logger } from 'hono/logger'

import { ProductsHandler } from '../handlers/products.handler.js'

export function loadRoutes(router: RouterInstance) {
  /* middleware */
  router.use(logger())

  /* static */
  router.use('*', serveStatic({ root: './static' }))
  router.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

  /* routes */
  const prefix = '/api'
  router.route(`${prefix}/products`, new ProductsHandler().router)
}
