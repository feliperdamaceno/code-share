import { computed, reactive, ref } from 'vue'

import type { CartProduct } from '@code-share/shared/types/product'

import { defineStore } from 'pinia'

import { useCouponStore } from './coupon.store'

export const useCartStore = defineStore('cart', () => {
  const coupons = useCouponStore()

  /* private: state */
  const cart = reactive<Map<string, CartProduct>>(new Map())

  /* getters */
  const products = computed((): CartProduct[] => Array.from(cart.values()))
  const size = computed(() => products.value.length)

  const subtotal = computed(() => {
    return products.value.reduce((result, product) => {
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
      total: (percentage / 100) * subtotal.value
    }
  })

  const total = computed(() => {
    return subtotal.value - discount.value.total
  })

  /* actions */
  function inCart(id: string) {
    return cart.has(id)
  }

  function add(product: CartProduct) {
    if (inCart(product.id)) return increase(product.id)
    cart.set(product.id, product)
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

  function remove(id: string) {
    cart.delete(id)
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
    inCart
  }
})

export const useCartSidebarStore = defineStore('cart-sidebar', () => {
  /* state */
  const open = ref(false)

  /* actions */
  const toggle = () => (open.value = !open.value)

  return { open, toggle }
})
