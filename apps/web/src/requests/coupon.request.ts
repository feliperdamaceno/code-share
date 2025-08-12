import type { Coupon } from '@code-share/shared/types/ecomm'

export class CouponRequest {
  static async validate(code: string): Promise<[Coupon, null] | [null, Error]> {
    try {
      const response = await fetch(`/api/coupons/validate?code=${code}`, {
        method: 'POST'
      })

      const json = (await response.json()) as { data: Coupon }
      return [json.data, null]
    } catch (error) {
      if (error instanceof Error) {
        return [null, error]
      }
      throw error
    }
  }
}
