import type { Product } from '@code-share/shared/types/product'
import type { RouterInstance } from '../types/core.types.js'

import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import data from '../../mock/data/products.json' with { type: 'json' }

export class ProductsHandler {
  router: RouterInstance

  constructor() {
    this.router = new Hono()

    this.router.get('/', async (ctx) => {
      const products: Product[] = data

      ctx.status(200)
      return ctx.json({ data: products })
    })

    this.router.get('/:slug', async (ctx) => {
      const slug = ctx.req.param('slug')

      if (slug == null) {
        throw new HTTPException(400, {
          message: 'Bad Request: Invalid or Missing Slug'
        })
      }

      const products: Product[] = data
      const product = products.find((product) => product.slug === slug)

      if (product) {
        ctx.status(200)
        return ctx.json({ data: product })
      }

      throw new HTTPException(404, {
        message: `Not Found: Product with slug "${slug}" not found`
      })
    })
  }
}
