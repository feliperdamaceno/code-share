import type { Product } from '@code-share/shared/types/product'
import type { RouterInstance } from '../types/core.types.js'

import { Hono } from 'hono'

const products: Product[] = [
  {
    src: 'https://picsum.photos/600/400',
    title: 'Sample Product',
    price: 49.9,
    available: true
  }
]

export class ProductsHandler {
  router: RouterInstance

  constructor() {
    this.router = new Hono()

    this.router.get('/', (ctx) => {
      ctx.status(200)
      return ctx.json(products)
    })
  }
}
