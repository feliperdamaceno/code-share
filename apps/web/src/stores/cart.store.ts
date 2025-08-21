import { computed, ref } from 'vue'

import type { CartProduct, Product } from '@code-share/shared/types/product'

import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { getDiscountAmount } from '@/utils/ecomm'

import { useCouponStore } from '@/stores/coupon.store'

export const useCartStore = defineStore('cart', () => {
  const sidebar = useCartSidebarStore()
  const coupons = useCouponStore()

  /* private: state */
  const cart = useStorage<Map<string, CartProduct>>(
    'cart',
    new Map(),
    sessionStorage
  )

  /* getters */
  const products = computed((): CartProduct[] =>
    Array.from(cart.value.values())
  )
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
  function add(product: Product) {
    if (hasProduct(product.id)) {
      sidebar.open = true
      return
    }

    sidebar.open = true
    cart.value.set(product.id, {
      id: product.id,
      title: product.title,
      image: product.images[0].src,
      price: product.price,
      discount: product.discount,
      quantity: 1
    })
  }

  function read(id: string) {
    if (hasProduct(id) === false) return null
    return cart.value.get(id) as CartProduct
  }

  function remove(id: string) {
    cart.value.delete(id)
  }

  function increase(id: string) {
    const product = cart.value.get(id) as CartProduct
    product.quantity += 1
    cart.value.set(id, product)
  }

  function decrease(id: string) {
    const product = cart.value.get(id) as CartProduct
    product.quantity -= 1
    cart.value.set(id, product)
  }

  function hasProduct(id: string) {
    return cart.value.has(id)
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
    read,
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
