import type { RouterInstance } from '../types/core.types.js'

import fs from 'fs'
import path from 'path'

import { serveStatic } from '@hono/node-server/serve-static'
import { HTTPException } from 'hono/http-exception'
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

  /* route everything else to vue router */
  router.all('*', async (ctx) => {
    if (!/^\/(api|static|favicon\.ico)/.test(ctx.req.url)) {
      try {
        const index = path.resolve('./static/index.html')
        const file = await fs.promises.readFile(index, 'utf-8')

        ctx.header('Cache-Control', 'public, max-age=3600') /* 1 hour */
        ctx.header('Content-Type', 'text/html')
        return ctx.body(file)
      } catch (error) {
        console.error(error)
        throw new HTTPException(500, {
          message: 'Internal Server Error'
        })
      }
    }
  })
}
