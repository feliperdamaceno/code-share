import { computed, ref } from 'vue'

import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  /* state */
  const products = ref([])

  /* getters */
  const size = computed(() => products.value.length)

  return { products, size }
})

export const useCartSidebarStore = defineStore('cart-sidebar', () => {
  /* state */
  const open = ref(false)

  /* actions */
  const toggle = () => (open.value = !open.value)

  return { open, toggle }
})
