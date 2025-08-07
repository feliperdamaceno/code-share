import type { RouterInstance } from '../types/core.types.js'

import { serveStatic } from '@hono/node-server/serve-static'
import { logger } from 'hono/logger'

import { CategoryHandler } from '../handlers/categories.handler.js'
import { CouponHandler } from '../handlers/coupons.handler.js'
import { ProductsHandler } from '../handlers/products.handler.js'

export function loadRoutes(router: RouterInstance) {
  /* middleware */
  router.use(logger())

  /* static */
  router.use('*', serveStatic({ root: './static' }))
  router.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

  /* mock */
  router.use(
    '/api/mock/images/*',
    serveStatic({
      root: './',
      rewriteRequestPath: (path) => path.replace(/^\/api/, '')
    })
  )

  /* routes */
  const prefix = '/api'
  router.route(`${prefix}/categories`, new CategoryHandler().router)
  router.route(`${prefix}/coupons`, new CouponHandler().router)
  router.route(`${prefix}/products`, new ProductsHandler().router)
}
