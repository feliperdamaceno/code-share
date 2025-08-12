import type { Coupon } from '@code-share/shared/types/ecomm'
import type { RouterInstance } from '../types/core.types.js'

import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import coupons from '../../mock/data/coupons.json' with { type: 'json' }

export class CouponHandler {
  router: RouterInstance

  constructor() {
    this.router = new Hono()

    this.router.post('/validate', async (ctx) => {
      const code = ctx.req.query('code')

      if (code == null) {
        throw new HTTPException(400, {
          message: 'Bad Request: Invalid or Missing Code'
        })
      }

      const coupon = coupons.find((coupon) => coupon.code === code)

      if (coupon) {
        ctx.status(200)
        return ctx.json({ data: coupon })
      }

      throw new HTTPException(404, {
        message: 'Not Found: Invalid Code'
      })
    })
  }
}
