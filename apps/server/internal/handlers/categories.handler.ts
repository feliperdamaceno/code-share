import type { Category } from '@code-share/shared/types/ecomm'
import type { RouterInstance } from '../types/core.types.js'

import { Hono } from 'hono'

import data from '../../mock/data/categories.json' with { type: 'json' }

export class CategoryHandler {
  router: RouterInstance

  constructor() {
    this.router = new Hono()

    this.router.get('/', async (ctx) => {
      const categories: Category[] = data

      ctx.status(200)
      return ctx.json({ data: categories })
    })
  }
}
