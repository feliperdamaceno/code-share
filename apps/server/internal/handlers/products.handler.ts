import type { Product } from '@code-share/shared/types/product'
import type { RouterInstance } from '../types/core.types.js'

import { Hono } from 'hono'

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
  }
}
