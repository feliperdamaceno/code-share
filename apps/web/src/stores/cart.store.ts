import { computed, reactive, ref } from 'vue'

import type { CartProduct } from '@code-share/shared/types/product'

import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  /* state */
  const cart = reactive<Map<string, CartProduct>>(new Map())

  /* getters */
  const products = computed((): CartProduct[] => Array.from(cart.values()))
  const size = computed(() => products.value.length)

  /* actions */
  function add(product: CartProduct) {
    if (inCart(product.id)) {
      const existing = cart.get(product.id) as CartProduct
      existing.quantity += 1
      cart.set(product.id, existing)
      return
    }

    cart.set(product.id, product)
  }

  function inCart(id: string) {
    return cart.has(id)
  }

  return { products, size, add, inCart }
})

export const useCartSidebarStore = defineStore('cart-sidebar', () => {
  /* state */
  const open = ref(false)

  /* actions */
  const toggle = () => (open.value = !open.value)

  return { open, toggle }
})
