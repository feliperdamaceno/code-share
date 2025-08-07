import type { Coupon } from '@code-share/shared/types/ecomm'
import type { RouterInstance } from '../types/core.types.js'

import { Hono } from 'hono'

import data from '../../mock/data/coupons.json' with { type: 'json' }

export class CouponHandler {
  router: RouterInstance

  constructor() {
    this.router = new Hono()

    this.router.get('/', async (ctx) => {
      const coupons: Coupon[] = data

      ctx.status(200)
      return ctx.json({ data: coupons })
    })
  }
}
