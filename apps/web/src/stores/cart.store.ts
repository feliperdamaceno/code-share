import { computed, reactive, ref } from 'vue'

import type { CartProduct } from '@code-share/shared/types/product'

import { defineStore } from 'pinia'

import { getDiscountAmount } from '@/utils/ecomm'

import { useCouponStore } from '@/stores/coupon.store'

export const useCartStore = defineStore('cart', () => {
  const coupons = useCouponStore()

  /* private: state */
  const cart = reactive<Map<string, CartProduct>>(new Map())

  /* getters */
  const products = computed((): CartProduct[] => Array.from(cart.values()))
  const size = computed(() => products.value.length)

  const subtotal = computed(() => {
    return products.value.reduce((result, product) => {
      if (hasDiscount(product)) {
        const discount = getDiscountAmount({
          price: product.price,
          discount: product.discount.percentage
        })

        result += (product.price - discount) * product.quantity
        return result
      }

      result += product.price * product.quantity
      return result
    }, 0)
  })

  const discount = computed(() => {
    const percentage = coupons.validated.reduce((result, coupon) => {
      return (result += coupon.discount)
    }, 0)

    return {
      percentage,
      total: getDiscountAmount({
        price: subtotal.value,
        discount: percentage
      })
    }
  })

  const total = computed(() => {
    return subtotal.value - discount.value.total
  })

  /* actions */
  function add(product: CartProduct) {
    if (hasProduct(product.id)) return increase(product.id)
    cart.set(product.id, product)
  }

  function remove(id: string) {
    cart.delete(id)
  }

  function increase(id: string) {
    const product = cart.get(id) as CartProduct
    product.quantity += 1
    cart.set(id, product)
  }

  function decrease(id: string) {
    const product = cart.get(id) as CartProduct
    product.quantity -= 1
    cart.set(id, product)
  }

  function hasProduct(id: string) {
    return cart.has(id)
  }

  function hasDiscount(product: CartProduct) {
    return product.discount.percentage > 0
  }

  return {
    products,
    size,
    subtotal,
    discount,
    total,
    add,
    remove,
    increase,
    decrease,
    hasProduct,
    hasDiscount
  }
})

export const useCartSidebarStore = defineStore('cart-sidebar', () => {
  /* state */
  const open = ref(false)

  /* actions */
  const toggle = () => (open.value = !open.value)

  return { open, toggle }
})
