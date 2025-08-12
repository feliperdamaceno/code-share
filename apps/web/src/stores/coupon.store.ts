import { computed, reactive, shallowRef } from 'vue'

import type { Coupon } from '@code-share/shared/types/ecomm'

import { defineStore } from 'pinia'

import { CouponRequest } from '@/requests/coupon.request'

export const useCouponStore = defineStore('coupon', () => {
  /* private: state */
  const coupons = reactive<Map<string, Coupon>>(new Map())

  /* getters */
  const validated = computed((): Coupon[] => Array.from(coupons.values()))
  const error = shallowRef<Error | null>(null)

  /* actions */
  async function validate(code: string) {
    const [coupon, err] = await CouponRequest.validate(code)

    if (err !== null) {
      return (error.value = err)
    }

    coupons.set(coupon.id, coupon)
  }

  function remove(id: string) {
    coupons.delete(id)
  }

  return { validated, error, validate, remove }
})
